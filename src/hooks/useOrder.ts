import { useContext } from "react";
import { OrderContext } from "../context/Order/OrderContext";

export const useOrder = () => useContext(OrderContext);
