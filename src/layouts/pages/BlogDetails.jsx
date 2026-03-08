import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BlogCard from "../../components/BlogCard";

const categoryColors = {
  "Health Tips": "bg-green-100 text-green-600",
  "Donation Guide": "bg-blue-100 text-blue-600",
  "Success Stories": "bg-purple-100 text-purple-600",
  Awareness: "bg-yellow-100 text-yellow-700",
  Nutrition: "bg-orange-100 text-orange-600",
};

const roleStyles = {
  admin: "bg-red-100 text-primary",
  volunteer: "bg-blue-100 text-blue-600",
};

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs/${id}`);
      return res.data;
    },
  });

  // Fetch related blogs
  const { data: relatedData } = useQuery({
    queryKey: ["related-blogs", blog?.category],
    enabled: !!blog?.category,
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs", {
        params: { category: blog.category, limit: 3, page: 1 },
      });
      return res.data;
    },
  });

  const related = relatedData?.data?.filter((b) => b._id !== id) || [];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${blog?.title}`;
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    window.open(links[platform], "_blank");
  };

  // Loading skeleton
  if (isLoading) {
    return <Loader />;
  }

  if (!blog) {
    return (
      <div className="text-center py-32 text-gray-400">
        <p className="text-5xl mb-4">📄</p>
        <p className="text-lg font-medium">Blog post not found.</p>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-6 text-primary font-semibold hover:underline"
        >
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate("/blogs")}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20 transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blogs
        </button>

        {/* Meta overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[blog.category] || "bg-gray-100 text-gray-600"}`}
            >
              {blog.category}
            </span>
            <span className="text-white/50 text-xs">{blog.readTime}</span>
            <span className="text-white/50 text-xs">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Excerpt */}
        <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-red-400 pl-5 mb-10 italic">
          {blog.excerpt}
        </p>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-14">
          {blog.content.split("\n").map((para, i) => (
            <p key={i} className="mb-5 text-gray-600 leading-8">
              {para}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-10" />

        {/* Author Info Card */}
        <div className="bg-gray-50 rounded-3xl p-7 flex items-center gap-6 mb-8 border border-gray-100">
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <img
              src={blog.authorImage}
              className="w-full h-full rounded-full object-cover  "
              alt=""
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-dark1 font-bold text-lg">{blog.authorName}</p>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleStyles[blog.authorRole] || "bg-gray-100 text-gray-500"}`}
              >
                {blog.authorRole}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          <span className="text-gray-500 text-sm font-semibold">
            Share this article:
          </span>

          {/* Facebook */}
          <button
            onClick={() => handleShare("facebook")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            Facebook
          </button>

          {/* Twitter / X */}
          <button
            onClick={() => handleShare("twitter")}
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X
          </button>

          {/* WhatsApp */}
          <button
            onClick={() => handleShare("whatsapp")}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.849L.057 23.428a.75.75 0 00.921.944l5.803-1.521A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.94-1.345l-.355-.21-3.644.955.974-3.532-.232-.368A9.721 9.721 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            WhatsApp
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => handleShare("linkedin")}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </button>
        </div>

        {/* Related Blogs */}
        {related.length > 0 && (
          <div>
            <div className="border-t border-gray-100 mb-10" />
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-100 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
                Read More
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-dark1">
                Related <span className="text-primary">Articles</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <BlogCard key={item._id} blog={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
