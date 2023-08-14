import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, IMAGE_URL } from "../../api/config";
import OrderStatus from "../../components/order/OrderStatus";
import NothingInCart from "../../components/ui/NothingInCart";
import { UserOrder } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";

const ShipperHomePage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);

  useEffect(() => {
    async function getOrdersOfEachUser() {
      try {
        setIsLoading(true);
        if (user?.token) {
          const response = await axios.get(`${API_URL}/orders/users`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          });

          const userOrders: UserOrder[] = response.data.orders;
          const filteredUserOrders = userOrders
            .map((userOrder) => {
              const newOrders = userOrder.orders.filter(
                (order) => order.status !== "completed"
              );
              const newUserOrder: UserOrder = {
                ...userOrder,
                orders: newOrders,
              };
              return newUserOrder;
            })
            .filter((userOrder) => userOrder.orders.length > 0);

          setUserOrders(filteredUserOrders);
        }
      } catch (error) {
        console.log("MY ORDER ERROR ", error);
      } finally {
        setIsLoading(false);
      }
    }
    getOrdersOfEachUser();
  }, []);

  function goToDetailPage(userID: string) {
    navigate(`/${userID}/orders`);
  }

  function getOrderStatus(statuses: string[]) {
    if (statuses.every((status) => status === "completed")) {
      return "completed";
    }

    if (statuses.every((status) => status === "shipping")) {
      return "shipping";
    }
    return "processing";
  }

  if (isLoading) {
    return <p></p>;
  }

  if (userOrders.length === 0) {
    return (
      <div className="mt-10">
        <NothingInCart
          title="No order now"
          description="Take a break and wait to see upcomming orders"
        />
      </div>
    );
  }

  return (
    <div>
      <table className="overflow-scroll md:w-[600px] lg:w-[1000px] xl:w-[1300px] divide-y divide-gray-200 mx-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userOrders &&
            userOrders.map((userOrder, index) => (
              <tr
                className="cursor-pointer"
                key={index}
                onClick={() => goToDetailPage(userOrder._id)}
              >
                <td className="flex items-center justify-start gap-2 px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-16 rounded-full"
                      src={`${IMAGE_URL}/img/users/${userOrder.user.photo}`}
                      alt=""
                    />
                    <p className="text-wording font-medium">
                      {userOrder.user.name}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {userOrder.orders.reduce((quantity, order) => {
                    return quantity + order.quantity;
                  }, 0)}
                </td>
                <td className="px-6 py-4 ">
                  <OrderStatus
                    status={getOrderStatus(
                      userOrder.orders.map((order) => order.status)
                    )}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipperHomePage;
