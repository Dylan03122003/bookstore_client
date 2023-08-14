import { motion } from "framer-motion";

import React from "react";

type BackdropProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-full bg-[#00000079] flex items-center justify-center z-50"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
