import { User } from "../Auth/AuthType";
import { Book } from "../Book/BookType";

export type OrderContextType = {
  orders: Order[];
  addOrders: (newOrders: Order[]) => void;
};

export type OrderProps = {
  children: React.ReactNode;
};

export type Order = {
  _id?: string;
  book: string; // Book ID
  user: string; // User ID
  quantity: number;
  status?: "processing" | "shipping" | "completed" | "failed";
};

export type FullOrder = {
  _id: string;
  quantity: number;
  status: "processing" | "shipping" | "completed" | "failed";
  book: Book;
  user: User;
};

export type UserOrder = {
  _id: string;
  user: User;
  orders: {
    _id: string;
    quantity: number;
    status: "processing" | "shipping" | "completed" | "failed";
    book: string;
  }[];
};

export type MyOrder = {
  _id: string;
  quantity: number;
  status: "processing" | "shipping" | "completed" | "failed";
  book: Book;
};
