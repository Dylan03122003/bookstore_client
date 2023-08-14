import { useContext } from "react";
import { BookContext } from "../context/Book/BookContext";

export const useBook = () => useContext(BookContext);
