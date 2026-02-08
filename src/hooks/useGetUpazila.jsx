import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGetDistricts from "./useGetDistricts";

const useGetUpazila = (districtName) => {
  const [districts] = useGetDistricts();

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await axios.get("/upazila.json");
      return res.data;
    },
  });

  const selectedDistrict = districts.find(
    (district) => district.name === districtName,
  );

  const filteredUpazilas = selectedDistrict
    ? upazilas.filter((item) => item.district_id === selectedDistrict.id)
    : [];

  return [filteredUpazilas];
};

export default useGetUpazila;
