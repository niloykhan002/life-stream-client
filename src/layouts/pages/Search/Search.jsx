import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Search = () => {
  const axiosPublic = useAxiosPublic();
  const [districts, setDistricts] = useState([]);
  const [selected, setSelected] = useState("1");
  const [upazila, setUpazila] = useState([]);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);
  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedUpazila = data.filter(
          (item) => item.district_id === selected
        );
        setUpazila(selectedUpazila);
      });
  }, [selected]);

  const handleChange = (e) => {
    const districtName = e.target.value;
    const district = districts.find(
      (district) => district.name === districtName
    );
    setSelected(district.id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    axiosPublic
      .get("/users", {
        params: formValues,
      })
      .then((res) => setDonors(res.data));
  };
  return (
    <div className="mt-40 mb-12 container mx-auto">
      <div className=" bg-base-200 p-10 rounded-lg ">
        <h2 className="text-center text-4xl font-bold mb-10">
          Search <span className="text-primary">Donors</span>
        </h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select className="select select-bordered w-full" name="group">
              <option defaultChecked>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              onChange={handleChange}
              className="select select-bordered w-full"
              name="district"
            >
              {districts.map((district) => (
                <option key={district.id}>{district.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upazila</span>
            </label>
            <select className="select select-bordered w-full" name="upazila">
              {upazila.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-block bg-primary text-white font-bold">
            Search
          </button>
        </form>
      </div>
      {donors.length > 0 && (
        <div className="mt-12">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Blood Group</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {donors.map((donor, index) => (
                <tr key={donor._id}>
                  <th>{index + 1}</th>
                  <td>{donor.name}</td>
                  <td>{donor.email}</td>
                  <td>{donor.blood_group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
