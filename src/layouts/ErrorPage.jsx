import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-rare">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-7xl font-extrabold">
          <span className="text-primary">Oo</span>ps!
        </h1>
        <h2 className="text-xl">404 Page Not Found</h2>
        <Link to={"/"} className="btn bg-primary text-white">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
