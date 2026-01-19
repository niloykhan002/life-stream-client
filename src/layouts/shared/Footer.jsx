import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-dark1 p-10">
      <aside>
        <Link
          to={"/"}
          className="btn font-heading border-none btn-ghost hover:bg-transparent font-bold text-lg uppercase md:text-2xl"
        >
          <div className="h-8 w-8">
            <img src={logo} alt="" />
          </div>
          <div>
            Life <span className="text-primary">Stream</span>
          </div>
        </Link>
        <p>
          Life Stream is a real-time free platform to help blood <br />{" "}
          searchers connect voluntary blood donors around Bangladesh.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Important Links</h6>
        <Link to={"/"} className="link link-hover">
          Home
        </Link>
        <Link to={"/create-donation-request"} className="link link-hover">
          Add Blood Request
        </Link>
        <Link to={"/search"} className="link link-hover">
          Search Donor
        </Link>
        <a className="link link-hover">Contact Us</a>
      </nav>
      <nav>
        <h6 className="footer-title">About</h6>
        <a className="link link-hover">Who we are</a>
        <a className="link link-hover">Our services</a>
        <a className="link link-hover">Our People</a>
        <a className="link link-hover">Sustainability</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
