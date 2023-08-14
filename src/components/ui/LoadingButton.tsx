import Loader from "./Loader";

type LoadingButtonProps = {
  marginY?: string;
  width?: string;
};

const LoadingButton = ({ marginY = "py-2", width }: LoadingButtonProps) => {
  return (
    <button
      disabled
      className={`flex items-center justify-center px-4 ${width} ${marginY} rounded-md bg-blue-500 cursor-not-allowed`}
    >
      <Loader />
      <p className="text-white">Loading...</p>
    </button>
  );
};

export default LoadingButton;
