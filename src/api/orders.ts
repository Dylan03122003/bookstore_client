import axios from "axios";
import { API_URL } from "./config";

export const getAllOrders = async (token: string) => {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
