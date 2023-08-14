import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../api/config";
import { Button } from "../../components";
import OrderCard from "../../components/order/OrderCard";
import { User } from "../../context/Auth/AuthType";
import { FullOrder } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";
import LoadingUserOrder from "./LoadingUserOrder";
import UserAddress from "./UserAddress";

const UserOrderDetail = () => {
  const { userID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [userOrderDetail, setUserOrderDetail] = useState<FullOrder[]>([]);
  const [orderOwner, setOrderOwner] = useState<User>();
  const navigate = useNavigate();

  function isShipping() {
    return userOrderDetail.every((order) => order.status === "shipping");
  }

  function getTotalOrderPrice() {
    return userOrderDetail.reduce((totalPrice, order) => {
      return totalPrice + order.book.price * order.quantity;
    }, 0);
  }

  async function getOrdersOfAnUser() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/users/${userID}/orders`);

      const responsedOrders: FullOrder[] = response.data.orders;
      const fullOrder = responsedOrders.filter(
        (order) => order.status !== "completed"
      );

      setUserOrderDetail(fullOrder);
      setOrderOwner(response.data.user);
    } catch (error) {
      console.log("MY ORDER ERROR ", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeStatus(status: string) {
    try {
      if (user?.token) {
        await axios.patch(
          `${API_URL}/users/${userID}/orders`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        getOrdersOfAnUser();
        if (status === "completed") {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("MY ORDER ERROR ", error);
    }
  }

  useEffect(() => {
    getOrdersOfAnUser();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-5">
        <LoadingUserOrder backgroundColor="bg-[#F1F2F5]" />;
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center md:justify-end gap-2 my-10 mr-5">
        {!isShipping() && (
          <Button
            backgroundColor="bg-blue-400"
            textColor="text-white"
            onClick={() => handleChangeStatus("shipping")}
          >
            Shipping
          </Button>
        )}
        <Button
          textColor="text-white"
          backgroundColor="bg-green-600"
          onClick={() => handleChangeStatus("completed")}
        >
          Completed
        </Button>
      </div>

      <UserAddress user={orderOwner} />

      <div className="flex items-center justify-start flex-col">
        {userOrderDetail.map((userOrder) => (
          <div key={userOrder._id}>
            <OrderCard order={userOrder} onLoadStatus={isLoading} />
          </div>
        ))}

        <p className="text-[#082445] font-semibold text-lg mb-10">
          <span className="mr-5">Total</span> ${getTotalOrderPrice().toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default UserOrderDetail;
