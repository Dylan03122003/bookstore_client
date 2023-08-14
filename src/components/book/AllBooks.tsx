import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Book } from "../../context/Book/BookType";
import { useBook } from "../../hooks/useBook";
import BookItem from "./BookItem";

function getDefaultBooks(
  books: Book[],
  currentPage: number,
  pageLength: number
): Book[] {
  return books.slice(currentPage - 1, pageLength);
}

function getLastPage(bookLength: number, itemsPerPage: number) {
  return Math.ceil(bookLength / itemsPerPage);
}

const itemsPerPage = 8;

const AllBooks = () => {
  const { books } = useBook();
  const [currentPage, setCurrentPage] = useState(1);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>();

  // ! May have bugs here
  useEffect(() => {
    setFilteredBooks(getDefaultBooks(books || [], currentPage, itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  const handlePageChange = (pageNumber: number) => {
    const firstIndex = itemsPerPage * (pageNumber - 1);
    const lastIndex = firstIndex + itemsPerPage - 1;

    if (
      pageNumber >= 1 &&
      books?.length &&
      pageNumber <= getLastPage(books.length, itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
    if (books) {
      setFilteredBooks(books.slice(firstIndex, lastIndex + 1));
    }
  };

  return (
    <div className="px-20 pt-20 flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold mb-14 text-center text-wording">
        Find your <span className="text-action">favorite books</span>
      </h1>
      <ul className="w-full flex items-center justify-center flex-wrap gap-5">
        {filteredBooks?.map((book) => (
          <li key={book._id}>
            <BookItem bookID={book._id} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-4 w-[300px] sm:w-full">
        <button
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-1 font-medium text-action disabled:text-gray-400"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <IoIosArrowBack />
          <p>Previous</p>
        </button>
        <div className="flex items-center justify-center text-white bg-action w-10 h-10 rounded-md">
          {currentPage}
        </div>
        <button
          disabled={
            currentPage ===
            getLastPage(books?.length ? books?.length : 0, itemsPerPage)
          }
          className="flex items-center justify-center gap-1 font-medium text-action disabled:text-gray-400"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <p>Next</p>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
