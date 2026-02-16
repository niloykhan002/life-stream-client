import { Outlet } from "react-router-dom";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <header className="mb-[68px]">
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-288px)] bg-slate-100">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
