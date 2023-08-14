import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";

type ToastProps = {
  message: string;
  position?: "top" | "right";
};

const Toast = ({ message, position = "top" }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function getPosition() {
    if (position === "top") {
      return "left-[50%] translate-x-[-50%]";
    } else if (position === "right") {
      return "right-0";
    }
  }

  if (!visible) {
    return null; // Don't render anything if the toast is not visible
  }

  return (
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      className={`absolute top-24 ${getPosition()}  w-[300px] sm:w-[500px] flex items-center justify-start p-4 gap-3 rounded-md bg-[#EBFBF5]`}
    >
      <div className="bg-[#35D39D] rounded-full p-1">
        <TiTick className="text-white" />
      </div>
      <p className="text-wording font-medium">{message}</p>
    </motion.div>
  );
};

export default Toast;
