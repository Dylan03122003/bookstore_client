import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { API_URL } from "../../api/config";
import { AuthState, authReducer } from "../Auth/AuthReducer";
import { AuthContextType, AuthProps, User } from "./AuthType";

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProps) => {
  const initialState: AuthState = {
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString !== null ? JSON.parse(userString) : null;
    dispatch({ type: "LOGIN", payload: user });
  }, []);

  async function loadAllUsers() {
    try {
      if (state.user?.token) {
        const response = await axios.get(`${API_URL}/users/get-all-users`, {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });
        setAllUsers(response.data.allUsers);
      }
    } catch (error) {
      console.log("MY ERROR: ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, dispatch, allUsers, loadAllUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};
