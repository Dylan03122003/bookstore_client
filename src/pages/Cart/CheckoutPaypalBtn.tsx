import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/config";
import { Order } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useOrder } from "../../hooks/useOrder";
type CheckoutPaypalBtnProps = {
  isDisabledButton?: boolean;
  description: string;
  price: number;
  orders: Order[];
};

const CheckoutPaypalBtn = ({
  description,
  price: initialPrice,
  isDisabledButton = false,
  orders: initialOrders,
}: CheckoutPaypalBtnProps) => {
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { addOrders } = useOrder();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const priceRef = useRef(initialPrice);
  const ordersRef = useRef(initialOrders);

  useEffect(() => {
    priceRef.current = initialPrice;
    ordersRef.current = initialOrders;
  }, [initialPrice, initialOrders]);

  const handleApprove = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/orders`,
        {
          orders: ordersRef.current,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      addOrders(response.data.orders);
      clearCart();
      navigate("/my-order");
    } catch (error) {
      console.log("MY ERROR: ", error);
    }

    setIsLoading(false);
    console.log("Successfully checked out");
  };

  if (error) {
    console.log("MY ERROR: ", error);
    return <p>There is an error</p>;
  }

  const createOrder = (data: any, actions: any) => {
    const totalPrice = priceRef.current.toFixed(2) + "";
    console.log("price in create order: ", totalPrice);
    console.log("description: ", description);
    return actions.order.create({
      purchase_units: [
        {
          description,
          amount: {
            value: totalPrice,
          },
        },
      ],
    });
  };

  return (
    <PayPalButtons
      disabled={isDisabledButton}
      onClick={(data, actions) => {
        console.log("BUTTON CLICKED");
      }}
      createOrder={createOrder}
      onApprove={async (data, actions) => {
        if (actions.order) {
          console.log("Approving order...");
          const order = await actions.order.capture();
          console.log("Order approved:", order);
          await handleApprove();
        }
      }}
      onError={(err) => {
        setError(err);
      }}
      onCancel={() => {
        console.log("YOU CANCELED");
      }}
    />
  );
};

export default CheckoutPaypalBtn;
