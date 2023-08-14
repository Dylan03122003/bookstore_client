import { BOOK_IMG_URL } from "../../api/config";
import { MyOrder } from "../../context/Order/OrderType";
import LoadingButton from "../ui/LoadingButton";
import OrderStatus from "./OrderStatus";

type OrderCardProps = {
  order: MyOrder;
  onLoadStatus?: boolean;
};

const OrderCard = ({ order, onLoadStatus = false }: OrderCardProps) => {
  return (
    <div className="w-[350px] md:w-[600px] bg-book-card rounded-md p-4 flex items-start gap-4 mb-5">
      <img
        className="w-32 md:w-52 rounded-sm"
        src={`${BOOK_IMG_URL}/${order.book.image}`}
        alt="image"
      />

      <div>
        <p className="text-lg font-medium">{order.book.title}</p>
        <p className="text-sm text-gray-500 mb-2">{order.book.author}</p>
        <p className="mb-2">
          <span>$</span> {order.book.price}
        </p>
        <p className="mb-2">
          <span className="text-wording">Quantity: </span>
          {order.quantity}
        </p>

        {!onLoadStatus ? (
          <OrderStatus status={order.status} />
        ) : (
          <LoadingButton marginY="py-1" />
        )}
      </div>
    </div>
  );
};

export default OrderCard;
