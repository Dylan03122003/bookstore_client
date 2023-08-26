const PORT = 3000;

export let API_URL: string;
export let IMAGE_URL: string;
export let BOOK_IMG_URL: string;

if (process.env.NODE_ENV === "production") {
  API_URL = `https://api-bookstore-1cpj.onrender.com/api`;
  IMAGE_URL = `https://api-bookstore-1cpj.onrender.com`;
  BOOK_IMG_URL = `https://api-bookstore-1cpj.onrender.com/img/books`;
} else {
  API_URL = `http://localhost:${PORT}/api`;
  IMAGE_URL = `http://localhost:${PORT}`;
  BOOK_IMG_URL = `http://localhost:${PORT}/img/books`;
}
