import { motion } from "framer-motion";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import Backdrop from "./Backdrop";
type ModalProps = {
  handleClose: () => void;
  children: React.ReactNode;
  className?: string;
  height?: string;
  width?: string;
};

const dropIn = {
  hidden: {
    y: "0",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "0",
    opacity: 0,
  },
};

const Modal = ({
  handleClose,
  children,
  className,
  height = "h-[200px] sm:h-[300px]",
  width = "w-[300px] sm:w-[500px]",
}: ModalProps) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className={`relative bg-white rounded-md p-5 pt-10 ${className} ${height} ${width}`}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button onClick={handleClose} className="absolute top-2 right-2">
          <GrFormClose className="w-8 h-8 text-gray-500" />
        </button>
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
