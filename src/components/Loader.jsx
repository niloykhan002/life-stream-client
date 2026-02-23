import PropTypes from "prop-types";

const Loader = ({ fullPage = true }) => (
  <div
    className={`flex flex-col justify-center items-center gap-5
    ${fullPage ? "min-h-screen" : "min-h-[400px] w-full rounded-xl"}`}
  >
    {/* Spinner ring */}
    <div className="relative w-16 h-16">
      <span className="absolute inset-0 rounded-full border-4 border-slate-200" />
      <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
      </span>
    </div>

    <div className="text-center">
      <p className="text-dark1 font-semibold text-lg tracking-wide">
        Please wait
      </p>
      <p className="text-dark3 text-sm mt-1">Fetching data...</p>
    </div>

    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-primary opacity-70 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);
Loader.propTypes = {
  fullPage: PropTypes.bool,
};

export default Loader;
