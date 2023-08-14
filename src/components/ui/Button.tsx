import { motion } from "framer-motion";
import React from "react";
type ButtonProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  rounded?: string;
  borderOptions?: string;
  type?: "submit" | "button";
  paddingY?: string;
  disabled?: boolean;
  paddingX?: string;
  onClick: () => void;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  backgroundColor = "bg-white",
  textColor = "text-gray-500",
  rounded = "rounded-md",
  borderOptions = "",
  paddingX = "px-4",
  paddingY = "py-2",
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 1.05 }}
      className={`${paddingX} ${paddingY} ${rounded} ${textColor} ${backgroundColor} ${borderOptions} disabled:bg-white disabled:cursor-not-allowed disabled:text-slate-400 disabled:border disabled:border-solid disabled:border-slate-300`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default Button;
