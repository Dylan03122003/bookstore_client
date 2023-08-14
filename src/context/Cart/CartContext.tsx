import { createContext, useState } from "react";

import { useBook } from "../../hooks/useBook";
import { CartContextType, CartItem, CartProps } from "./CartType";

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { getBookByID } = useBook();

  function addToCart(bookID: string) {
    const book = getBookByID(bookID);
    setCart((currentItems) => {
      if (currentItems.find((item) => item.bookID === bookID) == null) {
        return [...currentItems, { bookID, numberOfBookInCart: 1 }];
      } else if (
        currentItems.find((item) => item.bookID === bookID)
          ?.numberOfBookInCart === book?.quantity
      ) {
        return currentItems;
      } else {
        return currentItems.map((item) => {
          if (item.bookID === bookID) {
            return { ...item, numberOfBookInCart: item.numberOfBookInCart + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(bookID: string) {
    setCart((currentItems) => {
      if (
        currentItems.find((item) => item.bookID === bookID)
          ?.numberOfBookInCart === 1
      ) {
        return currentItems.filter((item) => item.bookID !== bookID);
      } else {
        return currentItems.map((item) => {
          if (item.bookID === bookID) {
            return { ...item, numberOfBookInCart: item.numberOfBookInCart - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function getNumberOfBookInCart(bookID: string): number {
    return cart.find((item) => item.bookID === bookID)?.numberOfBookInCart || 1;
  }

  function getTotalQuantity() {
    return cart.reduce((total, item) => total + item.numberOfBookInCart, 0);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart,
        getNumberOfBookInCart,
        decreaseCartQuantity,
        getTotalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
