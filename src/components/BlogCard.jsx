import PropTypes from "prop-types";

const categoryColors = {
  "Health Tips": "bg-green-100 text-green-600",
  "Donation Guide": "bg-blue-100 text-blue-600",
  "Success Stories": "bg-purple-100 text-purple-600",
  Awareness: "bg-yellow-100 text-yellow-700",
  Nutrition: "bg-orange-100 text-orange-600",
};

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300 group flex flex-col">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[blog.category] || "bg-gray-100 text-gray-600"}`}
          >
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-dark1 font-bold text-base leading-snug mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {/* {getInitials(blog.authorName)} */}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-gray-700 text-xs font-semibold">
                  {blog.authorName}
                </p>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${blog.authorRole || "bg-gray-100 text-dark3"}`}
                >
                  {blog.authorRole}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-0.5">{blog.date}</p>
            </div>
          </div>
          <span className="text-gray-400 text-xs flex-shrink-0">
            {blog.readTime}
          </span>
        </div>

        {/* Read more */}
        <button className="mt-4 w-full text-center text-primary text-sm font-semibold hover:text-red-700 flex items-center justify-center gap-1 group/btn">
          Read More
          <svg
            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogCard;
