import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { FaEllipsisVertical } from "react-icons/fa6";

const DonationRequestManagement = ({ donation, refetch, index }) => {
  const user = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    patientName,
    bloodType,
    requiredBy,
    hospitalName,
    hospitalAddress,
    donation_status,
    userEmail,
  } = donation;

  const date = new Date(requiredBy).toLocaleDateString();

  const handleDelete = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.email !== email) {
          return Swal.fire({
            title: "Error!",
            text: "You Cannot Delete This!",
            icon: "error",
          });
        }
        axiosSecure.delete(`/donations/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your donation request has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleDone = (id) => {
    const updateInfo = { donation_status: "done" };
    axiosSecure.patch(`/donations/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleCancel = (id) => {
    const updateInfo = { donation_status: "canceled" };
    axiosSecure.patch(`/donations/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  return (
    <tr className="hover:bg-slate-100 transition-colors">
      <th>{index + 1}</th>
      <td className="text-center">{patientName}</td>
      <td className="text-center">{date}, </td>
      <td className="text-center">{hospitalName}</td>
      <td className="text-center ">{hospitalAddress}</td>
      <td className="text-center">{bloodType}</td>
      <td className="text-center">
        {donation_status === "inprogress" ? (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleDone(_id)}
              className="btn btn-neutral btn-xs"
            >
              Done
            </button>
            <button
              onClick={() => handleCancel(_id)}
              className="btn bg-primary border-none text-white btn-xs"
            >
              Cancel
            </button>
          </div>
        ) : (
          donation_status
        )}
      </td>
      <td className="text-center">
        {donation_status === "inprogress" ? (
          <div className="flex flex-col text-xs">
            <p>Name: {user.displayName}</p> <p>Email: {user.email}</p>
          </div>
        ) : (
          "None"
        )}
      </td>

      <td className="text-center">
        <div className="dropdown dropdown-left">
          <button tabIndex={0} role="button" className="p-2 hover:bg-base-200">
            <FaEllipsisVertical className="text-2xl" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-lg z-10 w-24 p-1 space-y-1 shadow"
          >
            <li>
              <Link
                to={`/dashboard/donations/${_id}`}
                className="btn btn-neutral btn-xs"
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
                to={`/donation-details/${_id}`}
                className="btn btn-neutral btn-xs"
              >
                View
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleDelete(_id, userEmail)}
                className="btn btn-xs bg-primary border-none text-white hover: "
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};
DonationRequestManagement.propTypes = {
  donation: PropTypes.object,
  refetch: PropTypes.func,
  index: PropTypes.number,
};

export default DonationRequestManagement;
