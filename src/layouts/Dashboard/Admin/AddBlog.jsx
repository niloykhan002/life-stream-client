import toast, { Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleBlog = async (e) => {
    e.preventDefault();
    const blog_title = e.target.blog_title.value;
    const image = e.target.blog_thumbnail.files[0];
    const blog_content = content;

    const res = await axiosPublic.post(
      image_hosting_api,
      { image: image },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const photoURL = res.data.data.display_url;

    const blogInfo = {
      blog_title: blog_title,
      blog_content: blog_content,
      thumbnail_image: photoURL,
      blog_status: "draft",
    };

    axiosSecure.post("/blogs", blogInfo).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Blog created successfully");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    });
  };

  return (
    <div>
      <Toaster />
      <div className=" bg-base-200 p-10 rounded-lg ">
        <h2 className="text-center text-4xl font-bold mb-10">
          Create New Blog
        </h2>
        <form onSubmit={handleBlog} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="blog_title"
              placeholder="Enter blog title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              name="blog_thumbnail"
              required
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <button className="btn btn-block bg-primary text-white font-bold">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
