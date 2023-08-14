type LoadingMyOrderProps = {
  backgroundColor?: string;
};

const LoadingMyOrder = ({
  backgroundColor = "bg-slate-300",
}: LoadingMyOrderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] md:w-[600px] mx-auto">
      <div
        className={`h-8 w-[40%] animate-pulse ${backgroundColor} mb-4`}
      ></div>

      <div
        className={`h-[200px] md:h-[300px] w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>

      <div
        className={`h-[200px] md:h-[300px] w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>

      <div
        className={`h-5 w-[40%] animate-pulse ${backgroundColor} mb-4`}
      ></div>
    </div>
  );
};

export default LoadingMyOrder;
