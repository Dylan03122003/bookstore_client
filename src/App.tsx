import { Navigate, Route, Routes } from "react-router-dom";
import TestComponent from "./components/TestComponent";
import NavbarAdmin from "./components/navbar-admin/NavbarAdmin";
import Navbar from "./components/navbar/Navbar";
import { UserRole } from "./context/Auth/AuthType";
import { useAuth } from "./hooks/useAuth";
import AboutPage from "./pages/About/AboutPage";
import AddBookPage from "./pages/AddBook/AddBookPage";
import AddUserPage from "./pages/AddUser/AddUserPage";
import AllOrderPage from "./pages/AllOrder/AllOrderPage";
import BookDetailPage from "./pages/BookDetail/BookDetailPage";
import BooksPage from "./pages/Books/BooksPage";
import CartPage from "./pages/Cart/CartPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import MyOrderPage from "./pages/MyOrder/MyOrderPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import ShipperHomePage from "./pages/ShipperHome/ShipperHomePage";
import UserOrderDetail from "./pages/ShipperHome/UserOrderDetail";
import SignUpPage from "./pages/SignUp/SignUpPage";
import UpdateBookPage from "./pages/UpdateBook/UpdateBookPage";
import UpdateMePage from "./pages/UpdateMe/UpdateMePage";
import UserDetailPage from "./pages/UserDetail/UserDetailPage";
import UsersPage from "./pages/Users/UsersPage";

const App = () => {
  const { user } = useAuth();

  if (user && user.role === UserRole.Shipper) {
    return (
      <div>
        <Navbar />
        <div className="h-[104px] w-full bg-red-100"></div>
        <Routes>
          <Route path="/" element={<ShipperHomePage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/:userID/orders" element={<UserOrderDetail />} />

          <Route path="/profile">
            <Route index element={<ProfilePage />} />
            <Route path="/profile/update-me" element={<UpdateMePage />} />
          </Route>
        </Routes>
      </div>
    );
  }

  if (user && user.role === UserRole.Admin) {
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <NavbarAdmin />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/profile">
            <Route index element={<ProfilePage />} />
            <Route path="/profile/update-me" element={<UpdateMePage />} />
          </Route>

          <Route path="/all-orders" element={<AllOrderPage />} />

          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userID" element={<UserDetailPage />} />

          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:bookID" element={<BookDetailPage />} />
          <Route path="/books/:bookID/update" element={<UpdateBookPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="h-[104px] w-full bg-red-100"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/:bookID" element={<BookDetailPage />} />

        <Route path="/profile">
          <Route index element={<ProfilePage />} />
          <Route path="/profile/update-me" element={<UpdateMePage />} />
        </Route>

        <Route path="/cart">
          <Route index element={<CartPage />} />
        </Route>
        <Route path="/my-order" element={<MyOrderPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="/test" element={<TestComponent />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
