import { User } from "../context/Auth/AuthType";

export const storeUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
