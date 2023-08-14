import { useState } from "react";
import { BOOK_IMG_URL } from "../../api/config";
import { Button } from "../../components";
import NothingInCart from "../../components/ui/NothingInCart";
import { Order } from "../../context/Order/OrderType";
import { useAuth } from "../../hooks/useAuth";
import { useBook } from "../../hooks/useBook";
import { useCart } from "../../hooks/useCart";
import AddressForm from "./AddressForm";
import Checkout from "./Checkout";
import QuantityPurchased from "./QuantityPurchased";

const CartPage = () => {
  const { cart, getNumberOfBookInCart, addToCart, decreaseCartQuantity } =
    useCart();
  const { getBookByID } = useBook();
  const { user } = useAuth();
  const [toCheckout, setToCheckout] = useState(false);
  const booksInCart = cart.map((book) => getBookByID(book.bookID));

  const totalPrice = booksInCart.reduce((total, book) => {
    if (book) {
      return total + book.price * getNumberOfBookInCart(book._id);
    } else {
      return total;
    }
  }, 0);

  const orders: Order[] = booksInCart.map((book) => {
    return {
      book: book?._id || "",
      user: user?.userID || "",
      quantity: getNumberOfBookInCart(book?._id || ""),
    };
  });

  const bookTitles = booksInCart.map((book) => book?.title).join(", ");

  if (cart.length <= 0) {
    return (
      <div className="mt-5">
        <NothingInCart
          description="That's okay, take your time and browse through our products until you find what you're looking for."
          title="Nothing in cart?"
        />
      </div>
    );
  }

  if (toCheckout) {
    if (user?.address) {
      return (
        <Checkout
          bookTitles={bookTitles}
          orders={orders}
          totalPrice={totalPrice}
        />
      );
    } else {
      return <AddressForm onCancel={() => setToCheckout(false)} />;
    }
  }

  return (
    <div className="w-[300px] md:w-[700px] lg:w-[1000px] mx-auto mt-10">
      {booksInCart.map((book) => (
        <div className="flex items-start justify-between mb-4 " key={book?._id}>
          <div className="flex items-start justify-start gap-4">
            {book?.image && (
              <img
                className="w-32"
                src={`${BOOK_IMG_URL}/${book.image}`}
                alt="image"
              />
            )}
            <div>
              <h2 className="text-lg font-medium">{book?.title}</h2>
              <p className="text-sm text-gray-600 mb-1">{book?.author}</p>
              <p className="text-gray-700 font-medium">
                $
                {book
                  ? (
                      book.price * getNumberOfBookInCart(book?._id || "")
                    ).toFixed(2)
                  : ""}
              </p>

              <div className="block md:hidden mt-5">
                <QuantityPurchased
                  onDecrease={decreaseCartQuantity}
                  onIncrease={addToCart}
                  bookInCartQuantity={getNumberOfBookInCart(book?._id || "")}
                  id={book?._id || ""}
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <QuantityPurchased
              onDecrease={decreaseCartQuantity}
              onIncrease={addToCart}
              bookInCartQuantity={getNumberOfBookInCart(book?._id || "")}
              id={book?._id || ""}
            />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between mt-10">
        <p className="text-wording font-medium">Total price</p>

        <p className="text-wording font-medium">${totalPrice.toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-end mt-10">
        <Button
          onClick={() => {
            setToCheckout(true);
          }}
          backgroundColor="bg-action"
          textColor="text-white"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
