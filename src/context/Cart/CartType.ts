import { Book } from "../Book/BookType";

export type CartContextType = {
  cart: CartItem[];
  addToCart: (bookID: string) => void;
  getNumberOfBookInCart: (bookID: string) => number;
  decreaseCartQuantity: (bookID: string) => void;
  getTotalQuantity: () => number;
  clearCart: () => void;
};

export type CartProps = {
  children: React.ReactNode;
};

export interface CartedBook extends Book {
  numberOfBookInCart: number;
}

export type CartItem = {
  bookID: string;
  numberOfBookInCart: number;
};
