import { Link } from "react-router-dom";
import "./Banner.css";
const Banner = () => {
  return (
    <div>
      <div className="hero min-h-[700px] background">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content">
          <div>
            <h1 className="mb-5 text-5xl font-bold">Your Blood, Their Hope.</h1>
            <p className="mb-5">
              Your small act of kindness can make a huge difference. Take the
              first step and become a donor. <br /> Life is precious, Let’s work
              together to ensure everyone has the chance to live it to the
              fullest.
            </p>
            <div className="flex items-center gap-4">
              <Link>
                <button className="btn bg-primary text-white border-none">
                  Join as a Donor
                </button>
              </Link>
              <Link>
                <button className="btn bg-white text-primary border-none">
                  Search Donors
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
