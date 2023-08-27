import axios from "axios";
import { API_URL } from "./config";

export const getAllBooks = async (page = 1, limit = 8) => {
  const response = await axios.get(
    `${API_URL}/books?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getBookDetail = async (bookID: string) => {
  const response = await axios.get(`${API_URL}/books/${bookID}`);
  return response.data;
};

export const addBook = async ({
  formData,
  token,
}: {
  formData: FormData;
  token: string;
}) => {
  const response = await axios.post(`${API_URL}/books`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
