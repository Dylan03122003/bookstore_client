import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, BOOK_IMG_URL, IMAGE_URL } from "../../api/config";
import OrderStatus from "../../components/order/OrderStatus";
import NothingInCart from "../../components/ui/NothingInCart";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { FullOrder } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";
import { getTitle } from "../../utils/renderBookProperties";
import LoadingAllOrder from "./LoadingAllOrder";

const AllOrderPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [allOrders, setAllOrders] = useState<FullOrder[]>([]);

  useEffect(() => {
    async function getMyOrder() {
      try {
        setIsLoading(true);
        if (user?.token) {
          const response = await axios.get(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          });
          setAllOrders(response.data.orders); // Set allOrders state with the retrieved data
        }
      } catch (error) {
        console.log("MY ORDER ERROR ", error);
      } finally {
        setIsLoading(false);
      }
    }
    getMyOrder();
  }, []);

  if (isLoading) {
    return (
      <AdminPageContainer>
        <div className="mt-10">
          <LoadingAllOrder backgroundColor="bg-slate-200" />
        </div>
      </AdminPageContainer>
    );
  }

  if (allOrders.length === 0) {
    return (
      <AdminPageContainer>
        <NothingInCart
          title="No order now!"
          description="Please wait for upcomming orders"
        />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <table className="w-[750px] lg:w-[1000px] xl:w-[1300px] divide-y divide-gray-200 mx-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Book
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Name
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
          {allOrders &&
            allOrders.map((order) => (
              <tr
                className="cursor-pointer"
                key={order._id}
                //   onClick={() => goToDetailPage(book._id)}
              >
                <td className="flex items-center justify-start gap-2 px-6 py-4 whitespace-nowrap">
                  <img
                    src={`${BOOK_IMG_URL}/${order.book.image}`}
                    alt=""
                    className=" w-20"
                  />
                  {getTitle(order.book.title)}
                </td>
                <td className="px-6 py-4">
                  <div className=" flex items-center justify-start gap-2">
                    {order.user.photo && (
                      <img
                        className="w-10 rounded-full"
                        src={`${IMAGE_URL}/img/users/${order.user.photo}`}
                        alt="user photo"
                      />
                    )}
                    <p>{order.user.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <OrderStatus status={order.status} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </AdminPageContainer>
  );
};

export default AllOrderPage;
