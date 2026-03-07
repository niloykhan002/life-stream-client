import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import donor from "../../../assets/stats-icons/donor.png";
import life from "../../../assets/stats-icons/life.png";
import blog from "../../../assets/stats-icons/blog.png";
import request from "../../../assets/stats-icons/request.png";

const StatsSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stats");
      return res.data;
    },
  });

  const statItems = [
    {
      label: "Active Donors",
      value: stats?.totalDonors ?? 0,
      icon: donor,
    },
    {
      label: "Blood Requests",
      value: stats?.totalRequests ?? 0,
      icon: request,
    },
    {
      label: "Lives Saved",
      value: stats?.totalFulfilled ?? 0,
      icon: life,
    },
    {
      label: "Published Blogs",
      value: stats?.totalBlogs ?? 0,
      icon: blog,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark1 leading-tight mb-2">
          Our <span className="text-primary">Impact</span>
        </h2>
        <p className="text-dark3 text-base mb-12">
          Numbers that represent lives changed through our community
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="bg-slate-100 rounded-2xl shadow-sm p-6 flex flex-col items-center gap-2 border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="h-8 w-8">
                <img src={item.icon} className="w-full" />
              </span>
              <span className="text-2xl font-bold text-primary">
                {item.value.toLocaleString()}+
              </span>
              <span className="text-sm text-dark3 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
