type LoadingUserProps = {
  backgroundColor?: string;
};

const LoadingUserDetail = ({
  backgroundColor = "bg-slate-300",
}: LoadingUserProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px]  mx-auto mt-20">
      <div
        className={`h-[200px] md:h-[300px] w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>

      <div
        className={`h-[100px] w-full animate-pulse ${backgroundColor} mb-4`}
      ></div>
    </div>
  );
};

export default LoadingUserDetail;
