import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("all");

  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", status],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs", {
        params: { blog_status: status },
      });
      return res.data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handlePublish = (id) => {
    const updateInfo = { blog_status: "published" };
    axiosSecure.patch(`/blogs/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleUnpublish = (id) => {
    const updateInfo = { blog_status: "draft" };
    axiosSecure.patch(`/blogs/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/blogs/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Blogs deleted Successfully",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-end items-end">
        <Link
          to={"/dashboard/content-management/add-blog"}
          className="btn bg-primary border-none text-white"
        >
          Add Blog
        </Link>
      </div>
      <div className="flex justify-end mr-4 mb-10 mt-8">
        <label className="form-control w-fit">
          <div className="label">
            <span className="label-text">Filter</span>
          </div>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered"
            name="status"
          >
            <option defaultChecked>all</option>
            <option>draft</option>
            <option>published</option>
          </select>
        </label>
      </div>

      {blogs.map((blog) => (
        <div key={blog._id} className="hero bg-base-200 p-10 rounded-xl my-8">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src={blog.thumbnail_image}
              className="w-52 h-52 rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-3xl font-bold">{blog.blog_title}</h1>
              <div
                className="my-5 text-justify"
                dangerouslySetInnerHTML={{ __html: blog.blog_content }}
              />
              {blog.blog_status === "draft" ? (
                <button
                  onClick={() => handlePublish(blog._id)}
                  className="btn bg-primary border-none text-white"
                >
                  Publish
                </button>
              ) : (
                <button
                  onClick={() => handleUnpublish(blog._id)}
                  className="btn bg-primary border-none text-white"
                >
                  Unpublish
                </button>
              )}
              <button
                onClick={() => handleDelete(blog._id)}
                className="btn bg-primary border-none ml-1 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentManagement;
