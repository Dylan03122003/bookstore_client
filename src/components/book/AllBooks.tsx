import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useQuery } from "react-query";
import { getAllBooks } from "../../api/books";
import { Book } from "../../context/Book/BookType";
import BookItem from "./BookItem";

interface BooksResponse {
  status: string;
  totalBooks: number;
  result: number;
  books: Book[];
}

const AllBooks = () => {
  const [page, setPage] = useState<number>(1);

  const booksQuery = useQuery<BooksResponse>({
    queryKey: ["books", { page }],
    keepPreviousData: true,
    queryFn: () => getAllBooks(page),
  });

  const totalPages = Math.ceil(
    booksQuery.data?.totalBooks ? booksQuery.data.totalBooks / 8 : 1
  );
  return (
    <div className="px-20 pt-20 flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold mb-14 text-center text-wording">
        Find your <span className="text-action">favorite books</span>
      </h1>
      <ul className="w-full flex items-center justify-center flex-wrap gap-5">
        {booksQuery.data?.books.map((book) => (
          <li key={book._id}>
            <BookItem bookID={book._id} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-4 w-[300px] sm:w-full">
        <button
          disabled={page === 1}
          className="flex items-center justify-center gap-1 font-medium text-action disabled:text-gray-400"
          onClick={() => setPage((prevPage) => prevPage - 1)}
        >
          <IoIosArrowBack />
          <p>Previous</p>
        </button>
        <div className="flex items-center justify-center text-white bg-action w-10 h-10 rounded-md">
          {page}
        </div>
        <button
          disabled={page >= totalPages}
          className="flex items-center justify-center gap-1 font-medium text-action disabled:text-gray-400"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          <p>Next</p>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
