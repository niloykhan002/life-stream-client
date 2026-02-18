import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import useGetDistricts from "../../hooks/useGetDistricts";
import useGetUpazila from "../../hooks/useGetUpazila";
import Loader from "../../components/Loader";
import { IoIosCamera } from "react-icons/io";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [districts] = useGetDistricts();
  const [selected, setSelected] = useState("Comilla");
  const [upazila] = useGetUpazila(selected);
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

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
    return <Loader />;
  }
  const handleImage = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    if (fileInputRef.current.files[0]) {
      try {
        const res = await axiosSecure.post(
          image_hosting_api,
          { image: formValues.image },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        formValues.image = res.data.data.display_url;
      } catch (error) {
        toast.error(error.message || "Image upload failed");
        return;
      }
    } else {
      delete formValues.image;
    }

    try {
      const res = await axiosSecure.patch(`/users/${info._id}`, formValues);

      if (res.data.modifiedCount > 0) {
        toast.success("Updated Successfully");
        refetch();
        setEdit(false);
      }
    } catch (error) {
      toast.error("Update failed");
      console.error(error);
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();
    setEdit(false);
  };

  return (
    <div className="bg-white p-10 rounded-lg">
      <Toaster />
      <div className="divider divider-start text-primary font-semibold text-xl">
        My Profile
      </div>
      <form ref={formRef} onSubmit={handleUpdate}>
        <div>
          {/* User */}
          <div className="bg-slate-100 flex justify-between p-6 rounded-lg mt-6">
            <div className="flex gap-4 items-center">
              <div className="w-24 h-24 rounded-full border-4 relative">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={info.image}
                  alt="Profile"
                />

                {edit && (
                  <button
                    type="button"
                    onClick={handleImage}
                    className="absolute bottom-2 right-[2px] p-1 bg-white rounded-full"
                  >
                    <IoIosCamera size={18} className=" text-dark2" />
                  </button>
                )}
                <div className="hidden">
                  <input ref={fileInputRef} type="file" name="image" />
                </div>
              </div>
              <div>
                <h3 className="text-lg text-dark1 font-medium">{`${info.firstName} ${info.lastName}`}</h3>
                <p className="text-base text-dark2 capitalize">{info.role}</p>
                <p className="text-base text-dark2 capitalize">{`${info.upazila}, ${info.district}`}</p>
              </div>
            </div>

            <div>
              {!edit && (
                <button
                  onClick={() => setEdit(true)}
                  type="button"
                  className="btn btn-sm border-none bg-primary text-white"
                >
                  Edit <MdEdit />
                </button>
              )}
            </div>
          </div>
          {/* Personal Info */}
          <div className="bg-slate-100 p-6 rounded-lg my-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-7 rounded-full bg-primary" />
              <h3 className="text-primary font-semibold text-lg">
                Personal Information
              </h3>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-5">
                {/* First Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-dark2">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={` transition-all duration-200 ${
                      !edit
                        ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none"
                        : "bg-white cursor-text input"
                    }`}
                    readOnly={!edit}
                    defaultValue={info.firstName}
                    required
                  />
                </div>
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-dark2">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="transition-all duration-200 pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none"
                    readOnly={true}
                    defaultValue={info.email}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Last Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-dark2">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={` transition-all duration-200 ${
                      !edit
                        ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none"
                        : "bg-white cursor-text input"
                    }`}
                    readOnly={!edit}
                    defaultValue={info.lastName}
                    required
                  />
                </div>
                {/* Phone Number */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-dark2">Phone Number</span>
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    className={` transition-all duration-200 ${
                      !edit
                        ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none"
                        : "bg-white cursor-text input"
                    }`}
                    readOnly={!edit}
                    defaultValue={`+${info.contactNumber}`}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Blood Group */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Group</span>
                  </label>
                  <select
                    className={` transition-all duration-200 ${
                      !edit
                        ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none capitalize"
                        : "bg-white cursor-text select select-bordered"
                    }`}
                    disabled={!edit}
                    name="blood_group"
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
                {/* User Role */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-dark2">User Role</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    className="transition-all duration-200 pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none capitalize"
                    readOnly={true}
                    defaultValue={info.role}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Address */}
          <div className="bg-slate-100 p-6 rounded-lg my-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-7 rounded-full bg-primary" />
              <h3 className="text-primary font-semibold text-lg">Address</h3>
            </div>
            <div className="divider"></div>
            <div className="flex gap-8">
              {/* District */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  onChange={(e) => setSelected(e.target.value)}
                  className={` transition-all duration-200 ${
                    !edit
                      ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none capitalize"
                      : "bg-white cursor-text select select-bordered"
                  }`}
                  disabled={!edit}
                  name="district"
                  defaultValue={info.district}
                >
                  {districts.map((district) => (
                    <option key={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>
              {/* upazila */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upazila</span>
                </label>
                <select
                  className={` transition-all duration-200 ${
                    !edit
                      ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none capitalize"
                      : "bg-white cursor-text select select-bordered"
                  }`}
                  disabled={!edit}
                  name="upazila"
                  defaultValue={info.upazila}
                >
                  {upazila.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* action buttons */}
        {edit && (
          <div className="flex justify-end gap-2 pt-5">
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-dark1 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
