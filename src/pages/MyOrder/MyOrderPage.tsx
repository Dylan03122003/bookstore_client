import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";
import OrderCard from "../../components/order/OrderCard";
import NothingInCart from "../../components/ui/NothingInCart";
import { FullOrder } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";
import LoadingMyOrder from "./LoadingMyOrder";

const MyOrderPage = () => {
  const [myOrder, setMyOrder] = useState<FullOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  function getTotalOrderPrice() {
    return myOrder.reduce((totalPrice, order) => {
      return totalPrice + order.book.price * order.quantity;
    }, 0);
  }

  useEffect(() => {
    async function getMyOrder() {
      try {
        setIsLoading(true);
        if (user?.token) {
          const response = await axios.get(`${API_URL}/orders/my-orders`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          });

          const myOrder: FullOrder[] = response.data.orders;
          const filteredMyOrder = myOrder.filter(
            (order) => order.status !== "completed"
          );

          setMyOrder(filteredMyOrder);
        }
      } catch (error) {
        console.log("MY ORDER ERROR ", error);
      }
      setIsLoading(false);
    }
    getMyOrder();
  }, [user?.token]);

  if (isLoading) {
    return (
      <div className="mt-10">
        <LoadingMyOrder backgroundColor="bg-[#F1F2F5]" />
      </div>
    );
  }

  if (myOrder.length === 0) {
    return (
      <div className="mt-20">
        <NothingInCart
          title="No Order Now?"
          description="That's okay, take your time and browse through our products until you
        find what you're looking for."
        />
        ;
      </div>
    );
  }

  return (
    <div className="flex items-center justify-start flex-col">
      <h2 className="text-xl font-semibold my-5 text-wording">My Order</h2>
      {myOrder.map((order) => (
        <div key={order._id}>
          <OrderCard order={order} />
        </div>
      ))}

      <p className="text-[#082445] font-semibold text-lg">
        <span className="mr-5">Total</span> ${getTotalOrderPrice().toFixed(2)}
      </p>
    </div>
  );
};

export default MyOrderPage;
