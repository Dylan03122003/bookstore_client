type DividerProps = {
  width?: string;
  marginY?: string;
};

const Divider = ({ width = "w-full", marginY = "my-2" }: DividerProps) => {
  return <div className={`${width} ${marginY} h-[1px] bg-gray-200 `}></div>;
};

export default Divider;
