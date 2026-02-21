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
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const [selected, setSelected] = useState(info.district || "Comilla");
  const [upazila] = useGetUpazila(selected);

  if (isLoading) return <Loader fullPage={false} />;

  const handleImage = () => fileInputRef.current.click();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    if (formValues.contactNumber) {
      formValues.contactNumber = formValues.contactNumber.replace(/^\+/, "");
    }

    if (fileInputRef.current.files[0]) {
      try {
        const res = await axiosSecure.post(
          image_hosting_api,
          { image: formValues.image },
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        formValues.image = res.data.data.display_url;
      } catch (error) {
        toast.error(error.message || "Image upload failed");
        setSaving(false);
        return;
      }
    } else {
      delete formValues.image;
    }

    try {
      const res = await axiosSecure.patch(`/users/${info._id}`, formValues);
      if (res.data.modifiedCount > 0) {
        toast.success("Profile updated successfully");
        refetch();
        setEdit(false);
      } else {
        toast("No changes were made");
      }
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();
    setSelected(info.district || "Comilla");
    setEdit(false);
  };

  const fieldClass = (editable) =>
    `transition-all duration-200 ${
      !editable
        ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none"
        : "bg-white cursor-text input input-bordered"
    }`;

  const selectClass = (editable) =>
    `transition-all duration-200 ${
      !editable
        ? "pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none capitalize"
        : "bg-white cursor-text select select-bordered"
    }`;

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg">
      <Toaster />
      <div className="divider divider-start text-primary font-semibold text-xl">
        My Profile
      </div>

      <form ref={formRef} onSubmit={handleUpdate}>
        {/* Profile header card */}
        <div className="bg-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-lg mt-6 gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow relative flex-shrink-0">
              <img
                className="w-full h-full rounded-full object-cover"
                src={
                  info.image ||
                  `https://ui-avatars.com/api/?name=${info.firstName}+${info.lastName}&background=random`
                }
                alt="Profile"
              />
              {edit && (
                <button
                  type="button"
                  onClick={handleImage}
                  className="absolute bottom-1 right-0 p-1.5 bg-white rounded-full shadow"
                >
                  <IoIosCamera size={16} className="text-dark2" />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
            </div>

            <div>
              <h3 className="text-lg text-dark1 font-semibold">
                {info.firstName} {info.lastName}
              </h3>
              <p className="text-sm text-dark2 capitalize">{info.role}</p>
              <p className="text-sm text-dark2 capitalize">
                {info.upazila}, {info.district}
              </p>
            </div>
          </div>

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

        {/* Personal Information */}
        <div className="bg-slate-100 p-6 rounded-lg my-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-7 rounded-full bg-primary" />
            <h3 className="text-primary font-semibold text-lg">
              Personal Information
            </h3>
          </div>
          <div className="divider mt-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-dark2">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                className={fieldClass(edit)}
                readOnly={!edit}
                defaultValue={info.firstName}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-dark2">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                className={fieldClass(edit)}
                readOnly={!edit}
                defaultValue={info.lastName}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-dark2">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                className="transition-all duration-200 pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none"
                readOnly
                defaultValue={info.email}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-dark2">Phone Number</span>
              </label>
              <input
                type="text"
                name="contactNumber"
                className={fieldClass(edit)}
                readOnly={!edit}
                defaultValue={
                  info.contactNumber ? `+${info.contactNumber}` : ""
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                className={selectClass(edit)}
                disabled={!edit}
                name="blood_group"
                defaultValue={info.blood_group}
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg}>{bg}</option>
                  ),
                )}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-dark2">User Role</span>
              </label>
              <input
                type="text"
                name="role"
                className="transition-all duration-200 pl-1 bg-transparent border-none cursor-default text-dark1 font-medium pointer-events-none capitalize"
                readOnly
                defaultValue={info.role}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-slate-100 p-6 rounded-lg my-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-7 rounded-full bg-primary" />
            <h3 className="text-primary font-semibold text-lg">Address</h3>
          </div>
          <div className="divider mt-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                onChange={(e) => setSelected(e.target.value)}
                className={selectClass(edit)}
                disabled={!edit}
                name="district"
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
                className={selectClass(edit)}
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

        {/* Action buttons */}
        {edit && (
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="bg-gray-300 hover:bg-gray-400 text-dark1 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
