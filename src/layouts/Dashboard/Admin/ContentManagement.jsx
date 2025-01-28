import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div>
      <div className="flex justify-end items-end">
        <Link
          to={"/dashboard/content-management/add-blog"}
          className="btn bg-primary text-white"
        >
          Add Blog
        </Link>
      </div>
    </div>
  );
};

export default ContentManagement;
