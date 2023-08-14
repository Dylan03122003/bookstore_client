import { Book } from "../context/Book/BookType";

export function compareBookTitles(bookA: Book, bookB: Book): number {
  return bookA.title.localeCompare(bookB.title);
}

export function compareBookAuthors(bookA: Book, bookB: Book): number {
  return bookA.author.localeCompare(bookB.author);
}

export function compareBookPrices(bookA: Book, bookB: Book): number {
  return bookA.price - bookB.price;
}

export function compareBookQuantity(bookA: Book, bookB: Book): number {
  return bookA.quantity - bookB.quantity;
}
