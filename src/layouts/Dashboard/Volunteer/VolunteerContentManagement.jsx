import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const VolunteerContentManagement = () => {
  const axiosPublic = useAxiosPublic();
  const [status, setStatus] = useState("all");

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs", status],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs", {
        params: { blog_status: status },
      });
      return res.data;
    },
  });
  return (
    <div>
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
        <div key={blog._id} className="hero bg-white p-10 rounded-xl my-8">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VolunteerContentManagement;
