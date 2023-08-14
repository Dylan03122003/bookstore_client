import { FaShippingFast } from "react-icons/fa";

type OrderStatusProps = {
  status: "processing" | "shipping" | "completed" | "failed";
};

const OrderStatus = ({ status }: OrderStatusProps) => {
  function getColor() {
    switch (status) {
      case "processing":
        return "bg-[#F2DDC4] text-[#341803]";
      case "completed":
        return "bg-[#40D094] text-[#202B2C]";
      case "shipping":
        return "bg-gray-200 text-slate-700";
    }
  }

  return (
    <div
      className={`w-fit ${
        status === "shipping"
          ? `flex items-center justify-center ${getColor()} rounded-md px-4 py-1 gap-2`
          : ""
      }`}
    >
      <p
        className={`${
          status === "shipping"
            ? "animate-bounce"
            : `px-4 py-1 rounded-md ${getColor()}`
        } font-medium  `}
      >
        {status}
      </p>
      {status === "shipping" && <FaShippingFast />}
    </div>
  );
};

export default OrderStatus;
