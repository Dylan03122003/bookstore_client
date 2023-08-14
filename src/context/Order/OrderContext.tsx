import { createContext, useState } from "react";

import { Order, OrderContextType, OrderProps } from "./OrderType";

export const OrderContext = createContext({} as OrderContextType);

export const OrderProvider = ({ children }: OrderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  function addOrders(newOrders: Order[]) {
    setOrders((prevOrders) => {
      return [...newOrders, ...prevOrders];
    });
  }

  return (
    <OrderContext.Provider value={{ orders: orders, addOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
