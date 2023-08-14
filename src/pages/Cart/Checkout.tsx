import { BOOK_IMG_URL } from "../../api/config";
import { Book } from "../../context/Book/BookType";
import { Order } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";
import { useBook } from "../../hooks/useBook";
import { useCart } from "../../hooks/useCart";
import { getTitle } from "../../utils/renderBookProperties";
import CheckoutPaypalBtn from "./CheckoutPaypalBtn";

type CheckoutProps = {
  totalPrice: number;
  bookTitles: string;
  orders: Order[];
};

const Checkout = ({ bookTitles, orders, totalPrice }: CheckoutProps) => {
  const { getBookByID } = useBook();
  const { user } = useAuth();
  const { getNumberOfBookInCart } = useCart();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const orderedBooks: Book[] = orders.map((order) => getBookByID(order.book)!);

  return (
    <div className="w-[300px] md:w-[700px] lg:w-[1000px] mx-auto flex flex-col md:flex-row items-start justify-between mt-8">
      <div>
        {orderedBooks.map((book) => (
          <div
            key={book._id}
            className="flex items-start justify-start gap-3 mb-2"
          >
            <img
              className="w-32 rounded-sm"
              src={`${BOOK_IMG_URL}/${book.image}`}
              alt=""
            />
            <div>
              <h2>{getTitle(book.title)}</h2>
              <p className="text-sm text-gray-600 mb-1">
                {book.author} (author)
              </p>
              <p className="text-gray-700 font-medium">${book.price}</p>
              <p className="mt-2">
                <span className="text-base text-gray-500">Quantity: </span>
                {getNumberOfBookInCart(book._id)}
              </p>
            </div>
          </div>
        ))}
        <div className="p-2 bg-slate-200 flex items-center justify-center rounded-md mt-5">
          <p className="text-lg text-wording font-semibold">
            <span className="">Total: </span> ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="md:mt-0 mt-10">
        <div className="mb-5 border border-solid border-gray-400 p-2 rounded-md">
          <p className="mb-2">
            <span className="text-gray-400">Your Address: </span>{" "}
            {user?.address}
          </p>
          <p>
            <span className="text-gray-400">Your Phone: </span>
            {user?.phone}
          </p>
        </div>

        <CheckoutPaypalBtn
          price={totalPrice}
          description={bookTitles}
          orders={orders}
        />
      </div>
    </div>
  );
};

export default Checkout;
