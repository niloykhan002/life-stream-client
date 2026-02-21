import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { FaEllipsisVertical } from "react-icons/fa6";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700 border border-amber-300",
  inprogress: "bg-blue-100 text-blue-700 border border-blue-300",
  done: "bg-green-100 text-green-700 border border-green-300",
  canceled: "bg-red-100 text-red-700 border border-red-300",
};

const statusLabels = {
  pending: "Pending",
  inprogress: "In Progress",
  done: "Done",
  canceled: "Canceled",
};

const DonationRequestManagement = ({ donation, refetch, index }) => {
  const { user } = useAuth(); //
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
    donorName,
    donorEmail,
  } = donation;

  const date = new Date(requiredBy).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

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
      if (!result.isConfirmed) return;

      if (user?.email !== email) {
        return Swal.fire({
          title: "Error!",
          text: "You cannot delete this request!",
          icon: "error",
        });
      }

      axiosSecure
        .delete(`/donations/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Deleted!",
              "Your donation request has been deleted.",
              "success",
            );
            refetch();
          }
        })
        .catch(() => {
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error",
          );
        });
    });
  };

  const handleDone = (id) => {
    Swal.fire({
      title: "Mark as Done?",
      text: "This will mark the donation as completed.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, mark done!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      axiosSecure
        .patch(`/donations/${id}`, { donation_status: "done" })
        .then(() => refetch())
        .catch(() => Swal.fire("Error!", "Could not update status.", "error"));
    });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this donation?",
      text: "This will mark the donation as canceled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      axiosSecure
        .patch(`/donations/${id}`, { donation_status: "canceled" })
        .then(() => refetch())
        .catch(() => Swal.fire("Error!", "Could not update status.", "error"));
    });
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors text-sm">
      <th className="text-slate-400">{index + 1}</th>
      <td className="text-center font-medium">{patientName}</td>
      <td className="text-center text-slate-500">{date}</td>{" "}
      <td className="text-center">{hospitalName}</td>
      <td className="text-center text-slate-500">{hospitalAddress}</td>
      <td className="text-center">
        <span className=" text-primary text-base font-bold">{bloodType}</span>
      </td>
      {/* Status badge + inprogress actions */}
      <td className="text-center">
        <div className="flex flex-col items-center gap-1.5">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusStyles[donation_status]}`}
          >
            {statusLabels[donation_status] || donation_status}
          </span>
          {donation_status === "inprogress" && (
            <div className="flex items-center gap-1 mt-1">
              <button
                onClick={() => handleDone(_id)}
                className="btn btn-success btn-xs text-white"
              >
                Done
              </button>
              <button
                onClick={() => handleCancel(_id)}
                className="btn btn-error btn-xs text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </td>
      <td className="text-center">
        {donation_status === "inprogress" && donorName ? (
          <div className="flex flex-col text-xs text-slate-600 gap-0.5">
            <p>
              <span className="font-semibold">Name:</span> {donorName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {donorEmail}
            </p>
          </div>
        ) : (
          <span className="text-slate-300 text-xs">Not Found</span>
        )}
      </td>
      {/* Actions dropdown */}
      <td className="text-center">
        <div className="dropdown dropdown-left">
          <button
            tabIndex={0}
            role="button"
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <FaEllipsisVertical className="text-xl text-slate-500" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-xl z-10 w-28 p-1.5 space-y-1 shadow-lg border border-slate-100"
          >
            <li>
              <Link
                to={`/dashboard/donations/${_id}`}
                className="btn btn-neutral btn-xs w-full"
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
                to={`/donation-details/${_id}`}
                className="btn btn-neutral btn-xs w-full"
              >
                View
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleDelete(_id, userEmail)}
                className="btn btn-xs bg-primary border-none text-white w-full"
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
  donation: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default DonationRequestManagement;
