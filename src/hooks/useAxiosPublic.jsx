import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://life-stream-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
