import img1 from "../../../assets/featured.jpg";

const Featured = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-center text-4xl font-bold my-20">
        Our <span className="text-primary">Features</span>
      </h2>
      <div>
        <div className="hero-content max-w-none flex-col lg:justify-between  lg:flex-row-reverse lg:items-end gap-10">
          <img
            src={img1}
            className="md:w-[550px] h-96 object-cover rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Why Choose Life Stream ?</h1>
            <p className="text-primary font-bold text-lg mt-6 mb-4">
              Connect Donors and Recipients
            </p>
            <p className=" text-justify">
              Though Bangladesh has more than 160 million people, the number of
              safe blood bank is very few. Without divisional towns, there is
              hardly any blood bank. But a huge amount of blood is needed for
              treatment purposes. A good number of accidents take place every
              day where blood needs essentially. As a result, people fall in
              real trouble to manage blood. But there are many blood donors who
              are interested in donating blood but don’t know who needs blood.
              The communication gap is resulting in the loss of many lives.
            </p>
            <div>
              <h2 className="text-lg text-primary font-bold my-5">
                Locate and Organize Blood Banks
              </h2>

              <p className="text-justify">
                Life Stream comes into the scenario to reduce or minimize the
                communication gap and connects people in a moment using the
                amazing power of SMS and email. As Life Stream services can also
                be availed by SMS, people from any class of the society can
                easily avail of Life Stream services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
