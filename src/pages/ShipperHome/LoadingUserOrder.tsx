type LoadingUserOrderProps = {
  backgroundColor?: string;
};

const LoadingUserOrder = ({
  backgroundColor = "bg-slate-300",
}: LoadingUserOrderProps) => {
  return (
    <div className="flex items-center flex-col justify-center gap-4 w-[350px] lg:w-[700px] mx-auto">
      <div
        className={`w-full h-48 lg:h-96 ${backgroundColor} animate-pulse rounded-md`}
      />
      <div
        className={`w-full h-48 lg:h-96 ${backgroundColor} animate-pulse rounded-md`}
      />
    </div>
  );
};

export default LoadingUserOrder;
