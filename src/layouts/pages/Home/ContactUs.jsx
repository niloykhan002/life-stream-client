import { FaHome, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="my-12 container mx-auto">
      <h2 className="text-center font-heading text-4xl font-bold my-20 uppercase">
        Contact Us
      </h2>
      <div className="lg:flex items-center gap-40">
        <div className="bg-red-200 p-10 shadow-lg rounded-xl flex flex-col gap-4 m-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl bg-white rounded-full p-3">
              <FaHome />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Address</h3>
              <p className="text-sm">
                314/GA, DIT Road, Rampura, <br /> Dhaka
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl bg-white rounded-full p-3">
              <FaPhone />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Phone</h3>
              <p className="text-sm">01626496837</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl bg-white rounded-full p-3">
              <MdEmail />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Email</h3>
              <p className="text-sm">lifestream023@gmail.com</p>
            </div>
          </div>
        </div>
        <form className="space-y-4 flex-1 bg-base-200 p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Send Message</h2>
          <div className="lg:flex items-center gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone</span>
            </div>
            <input
              type="number"
              name="phone"
              placeholder="Enter Your Phone Number"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Message</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              name="message   "
              placeholder="Message"
              required
            ></textarea>
          </label>

          <button className="btn btn-block bg-primary text-white font-bold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
