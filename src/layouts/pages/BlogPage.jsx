import { useState } from "react";
import BlogCard from "../../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const categories = [
  "All",
  "Health Tips",
  "Donation Guide",
  "Success Stories",
  "Awareness",
  "Nutrition",
];

const BlogPage = () => {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const axiosPublic = useAxiosPublic();

  const { data: featured } = useQuery({
    queryKey: ["featured-blog"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs/featured");
      return res.data;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", category, page],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs", {
        params: { category, page, limit: 6 },
      });
      return res.data;
    },
  });

  const blogs = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div className="bg-gradient-to-b from-white to-red-50 min-h-screen">
      {/* Page Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            📝 Our Blog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark1 leading-tight">
            Stay Informed, <span className="text-primary">Stay Ready</span>
          </h1>
          <p className="mt-4 text-dark3 text-lg max-w-xl mx-auto">
            Explore articles on blood health, donation tips, inspiring donor
            stories, and everything in between.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured Post */}
        {featured && (
          <div className="mb-14 group cursor-pointer">
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 shadow-md">
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full  || "bg-gray-100 text-gray-600"}`}
                  >
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-white font-extrabold text-2xl md:text-3xl leading-tight max-w-2xl mb-4 group-hover:text-red-300 transition-colors duration-200">
                  {featured.title}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center text-white text-xs font-bold">
                      {featured.authorName}
                    </div>
                    <span className="text-white/80 text-sm">
                      {featured.authorName}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize || "bg-gray-100 text-dark3"}`}
                    >
                      {featured.authorRole}
                    </span>
                  </div>
                  <span className="text-white/50 text-sm">{featured.date}</span>
                  <span className="text-white/50 text-sm">
                    {featured.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                category === cat
                  ? "bg-primary text-white shadow-md shadow-red-200"
                  : "bg-gray-100 text-dark3 hover:bg-red-50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <Loader fullPage={false} />
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No blogs found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-all ${
                  page === p
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
