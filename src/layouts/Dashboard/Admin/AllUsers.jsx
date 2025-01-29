import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("all");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", status],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { status: status },
      });
      return res.data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleBlock = (id) => {
    const updateInfo = { status: "blocked" };
    axiosSecure.patch(`/all-users/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleUnblock = (id) => {
    const updateInfo = { status: "active" };
    axiosSecure.patch(`/all-users/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleVolunteer = (id) => {
    const updateInfo = { role: "volunteer" };
    axiosSecure.patch(`/all-users/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleAdmin = (id) => {
    const updateInfo = { role: "admin" };
    axiosSecure.patch(`/all-users/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  return (
    <div className="container mx-auto my-20">
      <h1 className="text-center text-4xl font-bold mb-12">
        All <span className="text-primary">Users</span>
      </h1>
      <div className="flex justify-end mr-4">
        <label className="form-control w-fit my-12">
          <div className="label">
            <span className="label-text">Filter</span>
          </div>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered"
            name="status"
          >
            <option defaultChecked>all</option>
            <option>active</option>
            <option>blocked</option>
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="md:text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask rounded-lg h-12 w-12">
                        <img
                          className="h-full w-full"
                          src={user.image}
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td
                  className={
                    user.role === "admin"
                      ? "text-red-600"
                      : user.role === "volunteer"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                >
                  {user.role}
                </td>
                <td
                  className={
                    user.status === "active" ? "text-green-600" : "text-red-600"
                  }
                >
                  {user.status}
                </td>
                <th className="flex md:justify-end gap-4">
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      role="button"
                      className="p-2 hover:bg-base-200"
                    >
                      <FaEllipsisVertical className="text-2xl" />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                    >
                      <li>
                        <button
                          onClick={() => handleVolunteer(user._id)}
                          className="btn btn-warning text-white btn-xs"
                        >
                          Make Volunteer
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleAdmin(user._id)}
                          className="btn btn-error text-white btn-xs my-2"
                        >
                          Make Admin
                        </button>
                      </li>
                      <li>
                        {user.status === "active" ? (
                          <button
                            onClick={() => handleBlock(user._id)}
                            className="btn bg-red-600 text-white btn-xs w-fu"
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnblock(user._id)}
                            className="btn bg-green-600 text-white btn-xs"
                          >
                            Unblock
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
