import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BOOK_IMG_URL } from "../../api/config";
import { Book } from "../../context/Book/BookType";
import { useBook } from "../../hooks/useBook";
import { getTitle } from "../../utils/renderBookProperties";
const SearchBook = () => {
  const [searchKey, setSearchKey] = useState<string>();
  const navigate = useNavigate();
  const { books } = useBook();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchString = e.target.value.toLowerCase();
    setSearchKey(searchString);
    if (books && searchString) {
      setFilteredBooks(
        books.filter(
          (book) =>
            book.author.toLowerCase().includes(searchString) ||
            book.title.toLowerCase().includes(searchString)
        )
      );
    }

    if (!searchString) {
      setFilteredBooks([]);
    }
  }

  function reset() {
    setFilteredBooks([]);
    setSearchKey("");
  }

  function handleGoToDetail(bookID: string) {
    navigate(`/${bookID}`);
    reset();
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-2 p-2 border border-solid border-gray-400 rounded-md">
        <CiSearch className="w-6 h-6 text-gray-500" />
        <input
          type="text"
          className="outline-none text-wording"
          placeholder="Search"
          value={searchKey}
          onChange={(e) => handleSearchChange(e)}
        />
        <button onClick={reset}>
          <IoMdClose className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {filteredBooks.length !== 0 && (
        <div className="flex flex-col absolute bg-white p-2 gap-2 h-[300px] w-[280px] overflow-y-scroll shadow-lg">
          {filteredBooks.map((book) => (
            <div
              className="flex items-start justify-start gap-2 hover:bg-book-card p-2 rounded-md cursor-pointer"
              key={book._id}
              onClick={() => handleGoToDetail(book._id)}
            >
              <img
                className="w-16"
                src={`${BOOK_IMG_URL}/${book.image}`}
                alt=""
              />

              <div>
                <h2>{getTitle(book.title)}</h2>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBook;
