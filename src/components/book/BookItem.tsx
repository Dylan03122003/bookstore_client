import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { BOOK_IMG_URL } from "../../api/config";
import { useAuth } from "../../hooks/useAuth";
import { useBook } from "../../hooks/useBook";
import { useCart } from "../../hooks/useCart";
import AverageRating from "../rating/AverageRating";
import Price from "./Price";

type BookItemProps = {
  bookID: string;
};

const BookItem = ({ bookID }: BookItemProps) => {
  const { addToCart } = useCart();
  const { getBookByID } = useBook();
  const navigate = useNavigate();
  const { user } = useAuth();

  const book = getBookByID(bookID);

  function getTitle(title: string) {
    if (title.length >= 22) {
      return title.slice(0, 22) + "...";
    }
    return title;
  }

  function handleAddToCart() {
    if (!user) {
      return navigate("/log-in");
    }

    if (book) {
      addToCart(book._id);
    }
  }

  return (
    <div className="w-80 h-[450px]">
      <Link
        to={`/${bookID}`}
        className="h-[50%] flex items-center justify-center py-10 bg-[#F6F6F6] rounded-md cursor-pointer group"
      >
        {book?.image && (
          <img
            className="w-28 rounded-sm shadow-lg group-hover:scale-110 transition-all ease-in-out delay-100"
            src={`${BOOK_IMG_URL}/${book.image}`}
            alt={book?.title + "-image"}
          />
        )}
      </Link>

      <div className="mt-5 h-[50%]">
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            {getTitle(book?.title ? book.title : "")}
          </p>
          <Price price={book?.price ? book.price : 0} />
        </div>

        <p className="text-xs text-gray-500 my-2">{book?.author}</p>

        <div className="flex items-center justify-start gap-2">
          <AverageRating avgRating={book?.ratingsAverage || 4.5} />
          <p className="text-sm text-gray-500">{`( ${book?.ratingsQuantity} )`}</p>
        </div>

        <motion.button
          whileTap={{ scale: 1.1 }}
          onClick={handleAddToCart}
          className="border border-solid border-gray-600 font-semibold py-2 px-4 rounded-full mt-4"
        >
          Add to Cart
        </motion.button>
      </div>
    </div>
  );
};

export default BookItem;
