import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-black text-white p-10">
      <aside>
        <h2 className="text-3xl font-bold uppercase">
          Life <span className=" text-primary">Stream</span>
        </h2>
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
