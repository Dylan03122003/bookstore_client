import { AuthAction } from "./AuthReducer";

export type AuthContextType = {
  user: User | null;
  allUsers: User[] | null;
  loadAllUsers: () => void;
  dispatch: React.Dispatch<AuthAction>;
};

export type AuthProps = {
  children: React.ReactNode;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
  Shipper = "shipper",
}

export type User = {
  userID: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  photo?: string;
  token: string;
  role: UserRole;
};
