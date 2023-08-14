type LoadingBookProps = {
  backgroundColor?: string;
};

const LoadingBook = ({
  backgroundColor = "bg-slate-300",
}: LoadingBookProps) => {
  return (
    <div className="lg:w-[1000px] xl:w-[1200px] mx-auto  flex items-start justify-center flex-col lg:flex-row  gap-10">
      <div
        className={`flex items-center justify-center rounded-md h-[500px] w-full lg:w-[600px] xl:h-[600px] xl:w-[700px] animate-pulse ${backgroundColor}`}
      ></div>

      <div className="w-full p-5">
        <div className={`h-10 animate-pulse ${backgroundColor} mb-4`}></div>

        <div
          className={`h-5 w-[40%] animate-pulse ${backgroundColor} mb-4`}
        ></div>

        <div
          className={`h-5 w-[40%] animate-pulse ${backgroundColor} mb-4`}
        ></div>

        <div
          className={`h-5 w-[40%]  animate-pulse ${backgroundColor} mb-4`}
        ></div>

        <div
          className={`h-5 w-[40%] animate-pulse ${backgroundColor} mb-20`}
        ></div>

        <div
          className={`h-5 w-[40%] animate-pulse ${backgroundColor} mb-20`}
        ></div>

        <div
          className={`h-16 w-[40%] animate-pulse ${backgroundColor} mb-20`}
        />

        <div className={`h-[300px] animate-pulse ${backgroundColor}`} />
      </div>
    </div>
  );
};

export default LoadingBook;
