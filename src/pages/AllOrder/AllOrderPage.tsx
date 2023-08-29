import { useQuery } from "react-query";
import { BOOK_IMG_URL, IMAGE_URL } from "../../api/config";
import { getAllOrders } from "../../api/orders";
import OrderStatus from "../../components/order/OrderStatus";
import NothingInCart from "../../components/ui/NothingInCart";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { FullOrder } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";
import { getTitle } from "../../utils/renderBookProperties";
import LoadingAllOrder from "./LoadingAllOrder";

interface AllOrdersResponse {
  status: string;
  result: number;
  orders: FullOrder[];
}

const AllOrderPage = () => {
  const { user } = useAuth();

  const allOrdersQuery = useQuery<AllOrdersResponse>({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(user?.token ? user.token : ""),
  });

  if (allOrdersQuery.isLoading) {
    return (
      <AdminPageContainer>
        <div className="mt-10">
          <LoadingAllOrder backgroundColor="bg-slate-200" />
        </div>
      </AdminPageContainer>
    );
  }

  if (allOrdersQuery.data?.result === 0) {
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
          {allOrdersQuery.data?.orders &&
            allOrdersQuery.data.orders.map((order) => (
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
