import axios from "axios";
import { CreatedUser } from "../pages/AddUser/AddUserPage";
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

export const addUser = async (user: CreatedUser) => {
  const response = await axios.post(`${API_URL}/users/sign-up`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteBook = async ({
  bookID,
  token,
}: {
  bookID: string;
  token: string;
}) => {
  await axios.delete(`${API_URL}/books/${bookID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
