import { motion } from "framer-motion";
import React from "react";
type AddToCartBtnProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const AddToCartBtn = ({ children, onClick }: AddToCartBtnProps) => {
  return (
    <motion.button
      whileTap={{ scale: 1.1 }}
      onClick={onClick}
      className="border border-solid border-gray-600 font-semibold py-2 px-4 rounded-full"
    >
      {children}
    </motion.button>
  );
};

export default AddToCartBtn;
