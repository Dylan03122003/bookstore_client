type LoadingAllOrderProps = {
  backgroundColor?: string;
};

const LoadingAllOrder = ({
  backgroundColor = "bg-slate-300",
}: LoadingAllOrderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[1px] w-[350px] md:w-[600px] lg:w-[1300px] mx-auto">
      <div
        className={`h-24 w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
      <div
        className={`h-24 w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
      <div
        className={`h-24 w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
      <div
        className={`h-24 w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
      <div
        className={`h-24 w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
      <div
        className={`h-24 w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
      <div
        className={`h-24 w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
    </div>
  );
};

export default LoadingAllOrder;
