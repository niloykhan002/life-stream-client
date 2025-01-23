import { Outlet } from "react-router-dom";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="lg:mt-[77px]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
