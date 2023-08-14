import { useContext } from "react";
import { CartContext } from "../context/Cart/CartContext";

export const useCart = () => useContext(CartContext);
