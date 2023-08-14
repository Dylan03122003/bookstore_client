import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BOOK_IMG_URL } from "../../api/config";
import Categories from "../../components/book/Categories";
import SingleSelect from "../../components/ui/SingleSelect";
import AdminPageContainer from "../../components/wrapper/AdminPageContainer";
import { Book } from "../../context/Book/BookType";
import { useBook } from "../../hooks/useBook";
import { getDescription, getTitle } from "../../utils/renderBookProperties";
import {
  compareBookAuthors,
  compareBookPrices,
  compareBookQuantity,
  compareBookTitles,
} from "../../utils/sorting";

const BooksPage = () => {
  const { books } = useBook();
  const navigate = useNavigate();
  const [sortedBooks, setSortedBooks] = useState<Book[] | null>(
    books ? [...books].sort(compareBookTitles) : books
  );

  function goToDetailPage(bookID: string) {
    navigate(`/books/${bookID}`);
  }

  function handleSortBy(tag: string) {
    if (tag === "title") {
      setSortedBooks(books ? [...books].sort(compareBookTitles) : books);
    } else if (tag === "price") {
      setSortedBooks(books ? [...books].sort(compareBookPrices) : books);
    } else if (tag === "quantity") {
      setSortedBooks(books ? [...books].sort(compareBookQuantity) : books);
    } else if (tag === "author") {
      setSortedBooks(books ? [...books].sort(compareBookAuthors) : books);
    }
  }

  return (
    <AdminPageContainer>
      <div className="sm:p-0 p-5">
        <div className="w-[1300px] flex flex-col items-start mx-auto my-5 mb-10">
          <h2 className="text-xl text-wording font-semibold mb-10">
            All Books
          </h2>
          <SingleSelect
            defaultChoices={["title", "author", "price", "quantity"]}
            label="Select to sort"
            defaultSelected="title"
            marginX="mx-0"
            onChange={(tag) => handleSortBy(tag)}
          />
        </div>

        <table className="w-[1300px] divide-y divide-gray-200 mx-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBooks &&
              sortedBooks.map((book, index) => (
                <tr
                  className="cursor-pointer hover:bg-slate-50 delay-100"
                  key={index}
                  onClick={() => goToDetailPage(book._id)}
                >
                  <td className="flex items-center justify-start gap-2 px-6 py-4 whitespace-nowrap">
                    <img
                      src={`${BOOK_IMG_URL}/${book.image}`}
                      alt=""
                      className="w-24"
                    />
                    <p className="text-wording font-medium">
                      {getTitle(book.title)}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {getDescription(book.description)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{book.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Categories
                      categories={book.categories}
                      contained={false}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.quantity}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminPageContainer>
  );
};

export default BooksPage;
