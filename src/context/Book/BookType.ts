import { BookAction } from "./BookReducer";

export type BookContextType = {
  books: Book[] | null;
  dispatch: React.Dispatch<BookAction>;
  getBookByID: (bookID: string) => Book | undefined;
  getUniqueCategories: () => string[];
};

export type BookProps = {
  children: React.ReactNode;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  categories: string[];
  quantity: number;
  image: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  reviews?: Review[];
};

export type UserReview = {
  _id: string;
  name: string;
  photo: string;
};

export type Review = {
  _id: string;
  review: string;
  rating: number;
  user: UserReview;
};
