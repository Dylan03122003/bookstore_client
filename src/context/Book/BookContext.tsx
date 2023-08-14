import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { API_URL } from "../../api/config";
import { bookReducer } from "./BookReducer";
import { BookContextType, BookProps } from "./BookType";

export const BookContext = createContext({} as BookContextType);

export const BookProvider = ({ children }: BookProps) => {
  const [state, dispatch] = useReducer(bookReducer, {
    books: [],
  });

  async function getBooks() {
    try {
      const response = await axios.get(`${API_URL}/books`);
      dispatch({ type: "LOAD_BOOK", payload: response.data.books });
    } catch (error) {
      console.log("MY ERROR AT BOOKCONTEXT: ", error);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  function getBookByID(bookID: string) {
    return state.books?.find((book) => book._id === bookID);
  }

  function getUniqueCategories() {
    const uniqueCategories: string[] = [];
    state.books?.forEach((book) => {
      book.categories.forEach((category) => {
        if (!uniqueCategories.includes(category)) {
          uniqueCategories.push(category);
        }
      });
    });
    return uniqueCategories;
  }

  return (
    <BookContext.Provider
      value={{ books: state.books, dispatch, getBookByID, getUniqueCategories }}
    >
      {children}
    </BookContext.Provider>
  );
};
