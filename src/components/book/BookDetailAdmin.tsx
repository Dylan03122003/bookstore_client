import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Divider } from "..";
import { API_URL, BOOK_IMG_URL } from "../../api/config";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { Book } from "../../context/Book/BookType";
import { useAuth } from "../../hooks/useAuth";
import { useBook } from "../../hooks/useBook";
import LoadingBook from "../../pages/BookDetail/LoadingBook";
import AverageRating from "../rating/AverageRating";
// import Modal from "../ui/Modal/modal";
import Modal from "../ui/Modal/Modal";
import Categories from "./Categories";
import Reviews from "./Reviews";
const BookDetailAdmin = () => {
  const { bookID } = useParams();
  const { user } = useAuth();
  const { dispatch } = useBook();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  useEffect(() => {
    getABook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDeletingDecision() {
    setOpenModal(true);
  }

  async function handleDeleteBook() {
    //
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/books/${bookID}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "DELETE", bookID: bookID ? bookID : "" });
      navigate("/books");
    } catch (error) {
      console.log("THERE IS AN ERROR: ", error);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <AdminPageContainer>
        <div className="h-[160px]"></div>
        <LoadingBook backgroundColor="bg-slate-200" />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <AnimatePresence initial={false} mode="wait">
        {openModal && (
          <Modal
            handleClose={() => setOpenModal(false)}
            className="flex items-center justify-center flex-col"
          >
            <h2 className="mb-4 text-gray-500">
              Are you sure to delete this book?
            </h2>
            <Button
              onClick={() => {
                handleDeleteBook();
                setOpenModal(false);
              }}
              backgroundColor="bg-blue-500"
              textColor="text-white"
            >
              Accept deleting
            </Button>
          </Modal>
        )}
      </AnimatePresence>

      <div className="my-10 flex items-center justify-end gap-5">
        <Link
          className="bg-blue-500 px-4 py-2 rounded-md text-white"
          to={`/books/${bookID}/update`}
        >
          Update
        </Link>
        <Button
          backgroundColor="bg-[#1C1D2E]"
          textColor="text-white"
          disabled={isLoading}
          onClick={handleDeletingDecision}
        >
          {isLoading ? "Deleting" : "Delete"}
        </Button>
      </div>

      <div className=" lg:w-[750px] xl:w-[1000px] mx-auto  flex items-start justify-center flex-col lg:flex-row  gap-10">
        <div
          className={`flex items-center justify-center rounded-md h-[500px] w-full lg:w-[600px] xl:h-[600px] xl:w-[700px] bg-[#F6F6F6] ${
            isLoading ? "animate-pulse bg-[#F1F2F5]" : ""
          }`}
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
          <h2 className="text-2xl font-semibold">{book?.title}</h2>
          <p className="text-sm text-gray-500">{book?.author} (author)</p>

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

          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-base text-gray-600">{book?.description}</p>
          </div>

          <Divider marginY="my-10" />

          <Reviews reviews={book?.reviews || []} />
        </div>
      </div>
    </AdminPageContainer>
  );
};

export default BookDetailAdmin;
