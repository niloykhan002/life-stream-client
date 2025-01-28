import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Blog = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs", {
        params: { blog_status: "all" },
      });
      return res.data;
    },
  });
  return (
    <div className="container mx-auto mt-40">
      {blogs.map((blog) => (
        <div key={blog._id} className=" bg-base-200 p-10 rounded-xl my-8">
          <div className="md:flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-4">{blog.blog_title}</h1>
              <Link to={`/blogs/${blog._id}`}>
                <button className="btn bg-primary text-white">View More</button>
              </Link>
            </div>
            <img
              src={blog.thumbnail_image}
              className="w-52 h-52 rounded-lg shadow-2xl"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
