import { removeUser, storeUser } from "../../utils/storeToken";
import { User } from "./AuthType";

export type AuthState = {
  user: User | null;
};

export type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_ME"; updatedUser: User | null };

export const authReducer = (prevState: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      storeUser(action.payload);
      return { user: action.payload };
    case "LOGOUT":
      removeUser();
      return { user: null };
    case "UPDATE_ME":
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      storeUser(action.updatedUser!);
      return { user: action.updatedUser };
    default:
      return prevState;
  }
};
