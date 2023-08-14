import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider } from "..";
import { API_URL, BOOK_IMG_URL } from "../../api/config";
import { Book, Review } from "../../context/Book/BookType";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import LoadingBook from "../../pages/BookDetail/LoadingBook";
import AverageRating from "../rating/AverageRating";
import AddToCartBtn from "../ui/AddToCartBtn";
import Modal from "../ui/Modal/modal";
import BookReviewForm from "./BookReviewForm";
import Categories from "./Categories";
import Reviews from "./Reviews";

const BookDetailUser = () => {
  const { bookID } = useParams();
  const { addToCart, clearCart } = useCart();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const navigate = useNavigate();

  async function getABook() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/books/${bookID}`);
      setBook(response.data.book);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  function handleAddToCart() {
    if (!user) {
      return navigate("/log-in");
    }
    if (book) {
      addToCart(book._id);
    }
  }

  function handleReview() {
    if (!user) {
      navigate("/log-in");
    } else {
      setOpenReview(true);
    }
  }

  function handleBuyNow() {
    //
    if (!user) {
      return navigate("/log-in");
    }
    if (book) {
      clearCart();
      addToCart(book._id);
      navigate("/cart");
    }
  }

  function handleAddNewReview(newReview: Review) {
    setBook((prevBook) => {
      if (prevBook) {
        const updatedReviews = prevBook.reviews
          ? [...prevBook.reviews, newReview]
          : [newReview];

        const updatedBook: Book = {
          ...prevBook,
          ratingsAverage: calculateNewAverageRating(updatedReviews),
          ratingsQuantity: (prevBook.ratingsQuantity || 0) + 1,
          reviews: updatedReviews,
        };

        return updatedBook;
      }

      return null;
    });
  }

  function calculateNewAverageRating(reviews: Review[]): number {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  useEffect(() => {
    getABook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookID]);

  if (isLoading) {
    return <LoadingBook backgroundColor="bg-[#F1F2F5]" />;
  }

  return (
    <div className=" lg:w-[1000px] xl:w-[1200px] mx-auto  flex items-start justify-center flex-col lg:flex-row  gap-10">
      <div
        className={`flex items-center justify-center rounded-md h-[500px] w-full lg:w-[600px] xl:h-[600px] xl:w-[700px] bg-book-card`}
      >
        {book?.image && (
          <img
            className="w-72 lg:w-[80%]"
            src={`${BOOK_IMG_URL}/${book.image}`}
            alt=""
          />
        )}
      </div>

      <div className="w-full p-5">
        <h2 className={`text-2xl font-semibold`}>{book?.title}</h2>
        <p className={`text-sm text-gray-500 `}>{book?.author} (author)</p>

        <div className="flex items-center gap-2 my-5">
          <AverageRating avgRating={book?.ratingsAverage || 4.5} />
          <p className="text-sm text-gray-500">
            ({book?.ratingsQuantity} <span>ratings</span>)
          </p>
        </div>

        <Categories categories={book?.categories || []} />

        <p className="mt-5">
          <span className="text-sm text-gray-600">Available: </span>
          {book?.quantity}
        </p>

        <Divider marginY="my-10" />

        <div>
          <p className="text-xl font-medium">
            <span className="text-sm text-gray-600">Only</span> ${book?.price}
          </p>
        </div>

        <Divider marginY="my-10" />

        <div className="flex items-center justify-start flex-wrap gap-5">
          <Button
            backgroundColor="bg-action"
            textColor="text-white"
            rounded="rounded-full"
            paddingX="px-6"
            onClick={handleBuyNow}
          >
            Buy now
          </Button>
          <AddToCartBtn onClick={handleAddToCart}>Add to cart</AddToCartBtn>
          {!openReview && (
            <Button
              backgroundColor="bg-white"
              rounded="rounded-full"
              borderOptions="border border-solid border-gray-400"
              onClick={handleReview}
              textColor="text-wording"
            >
              Give your review
            </Button>
          )}
        </div>

        <Divider marginY="my-10" />

        <div>
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-base text-gray-600">{book?.description}</p>
        </div>

        <Divider marginY="my-10" />

        <Reviews reviews={book?.reviews || []} />

        <AnimatePresence initial={false} mode="wait">
          {openReview && (
            <Modal handleClose={() => setOpenReview(false)} height="h-fit">
              <BookReviewForm
                bookID={bookID || ""}
                onSubmit={(newReview) => {
                  handleAddNewReview(newReview);
                  setOpenReview(false);
                }}
              />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookDetailUser;
