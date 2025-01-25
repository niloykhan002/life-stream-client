import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MdCancel, MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCamera } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [selected, setSelected] = useState("1");
  const [upazila, setUpazila] = useState([]);
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);
  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedUpazila = data.filter(
          (item) => item.district_id === selected
        );
        setUpazila(selectedUpazila);
      });
  }, [selected]);

  const handleChange = (e) => {
    const districtName = e.target.value;
    const district = districts.find(
      (district) => district.name === districtName
    );
    setSelected(district.id);
  };

  const {
    refetch,
    data: info = {},
    isLoading,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {
        params: { email: user?.email },
      });
      return res.data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handleImage = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!fileInputRef.current.files[0]) {
      toast.error("Please upload an image");
      return;
    }
    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const res = await axiosSecure.post(
      image_hosting_api,
      { image: formValues.image },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    formValues.image = res.data.data.display_url;

    axiosSecure.patch(`/users/${info._id}`, formValues).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Updated Successfully");
        refetch();
        setEdit(false);
      }
    });
  };

  return (
    <div className=" bg-base-200 p-10 rounded-lg ">
      <Toaster />
      <h2 className="uppercase text-xl font-semibold">Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4 mt-8">
        <div className="flex justify-center items-center">
          <div className="w-28 h-28 rounded-full relative">
            <img className="w-full h-full rounded-full" src={info.image} />

            {edit && (
              <button
                type="button"
                onClick={handleImage}
                className="absolute bottom-1 right-0 p-2 bg-primary rounded-full"
              >
                <FaCamera className=" text-lg text-white  " />
              </button>
            )}
            <div className="hidden">
              <input ref={fileInputRef} type="file" name="image" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {edit ? (
            <button
              onClick={() => setEdit(false)}
              type="button"
              className="btn btn-sm bg-primary text-white"
            >
              Cancel <MdCancel />
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              type="button"
              className="btn btn-sm bg-primary text-white"
            >
              Edit <MdEdit />
            </button>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="input input-bordered"
            readOnly={!edit}
            defaultValue={info.name}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="input input-bordered"
            defaultValue={info.email}
            readOnly
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            className="select select-bordered w-full"
            name="blood_group"
            disabled={!edit}
            defaultValue={info.blood_group}
          >
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <select
            onChange={handleChange}
            className="select select-bordered w-full"
            name="district"
            disabled={!edit}
            defaultValue={info.district}
          >
            {districts.map((district) => (
              <option key={district.id}>{district.name}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <select
            className="select select-bordered w-full"
            name="upazila"
            disabled={!edit}
            defaultValue={info.upazila}
          >
            {upazila.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        {edit && (
          <button
            type="submit"
            className="btn btn-block bg-primary text-white font-bold"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
