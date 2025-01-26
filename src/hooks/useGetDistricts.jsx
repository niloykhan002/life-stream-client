import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetDistricts = () => {
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axios.get("/district.json");
      return res.data;
    },
  });
  return [districts];
};

export default useGetDistricts;
