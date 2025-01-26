import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGetDistricts from "./useGetDistricts";

const useGetUpazila = (districtName = "Comilla") => {
  const [districts] = useGetDistricts();
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await axios.get("/upazila.json");
      return res.data;
    },
  });

  const selectedDistrict = districts.find(
    (district) => district.name === districtName
  );
  const upazila = upazilas.filter(
    (item) => item.district_id === selectedDistrict.id
  );

  return [upazila];
};

export default useGetUpazila;
