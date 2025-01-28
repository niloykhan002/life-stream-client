import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: blog = {} } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs/${id}`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto mt-40">
      <div className="hero bg-base-200 p-10 rounded-xl my-8">
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
    </div>
  );
};

export default BlogDetails;
