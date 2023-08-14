import { Book } from "./BookType";

export type BookState = {
  books: Book[] | null;
};

export type BookAction =
  | { type: "ADD"; newBook: Book }
  | { type: "REMOVE" }
  | { type: "LOAD_BOOK"; payload: Book[] }
  | { type: "UPDATE"; payload: Book }
  | { type: "DELETE"; bookID: string };

export const bookReducer = (prevState: BookState, action: BookAction) => {
  const prevBooks = prevState.books !== null ? prevState.books : [];

  switch (action.type) {
    case "ADD":
      return { books: [action.newBook, ...prevBooks] };
    case "REMOVE":
      return { books: null };
    case "LOAD_BOOK":
      return { books: action.payload };
    case "DELETE":
      return { books: prevBooks.filter((book) => book._id !== action.bookID) };
    case "UPDATE":
      return {
        books: [
          ...prevBooks.map((book) =>
            book._id === action.payload._id ? action.payload : book
          ),
        ],
      };

    default:
      return prevState;
  }
};
