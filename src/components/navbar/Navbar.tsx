import { useState } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { UserRole } from "../../context/Auth/AuthType";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import SearchBook from "../book/SearchBook";
import StoryBoundLogo from "./../../assets/logo-storybound.jpg";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { user } = useAuth();
  const { getTotalQuantity } = useCart();
  const [open, setOpen] = useState(false);

  const totalQuantity = getTotalQuantity();

  function closeNavbar() {
    setOpen(false);
  }
  return (
    <header className="fixed w-full bg-white z-50">
      <nav className="flex items-center justify-between w-[92%] mx-auto ">
        <div className=" flex items-center">
          <button onClick={() => setOpen(!open)}>
            {!open ? (
              <HiOutlineMenuAlt2 className="text-3xl cursor-pointer md:hidden block text-gray-700" />
            ) : (
              <AiOutlineClose className="text-3xl cursor-pointer md:hidden block text-gray-700" />
            )}
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-3 my-8 ml-4 mr-14"
          >
            <img src={StoryBoundLogo} alt="Logo" className="w-[153px]" />
            {/* <p className="font-semibold">Storybound</p> */}
          </Link>

          <div
            className={`md:static absolute md:min-h-fit min-h-[30vh] left-0 ${
              open ? "top-[100%] bg-white " : "top-[-1000px]"
            } md:w-auto w-full flex flex-col items-center  duration-200 z-50  border-solid border-b-[1px] border-gray-200 md:border-none`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
                <Link to="/">Best seller</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>
              {!user && (
                <li className="md:hidden block">
                  <Link
                    to="/log-in"
                    className="border border-solid border-gray-500 px-4 py-2 rounded-md"
                    onClick={closeNavbar}
                  >
                    <span className="text-wording font-medium">Log in</span>
                  </Link>
                </li>
              )}
            </ul>
            {/* <div className="mt-20 h-[700px] opacity-20"></div> */}
          </div>
        </div>

        <ul className="flex items-center gap-4">
          {!user && (
            <li className="md:block hidden">
              <Link
                to="/log-in"
                className="border border-solid border-gray-500 px-4 py-2 rounded-md hover:bg-slate-50"
                onClick={closeNavbar}
              >
                <span className="text-wording font-medium">Log in</span>
              </Link>
            </li>
          )}

          {user !== null && user.role === UserRole.User && (
            <li className="hidden lg:block">
              <SearchBook />
            </li>
          )}

          {user === null ? (
            <li>
              <Link
                to="/sign-up"
                className="px-4 py-2 rounded-md bg-action text-white-custom"
                onClick={closeNavbar}
              >
                <span>Sign up</span>
              </Link>
            </li>
          ) : (
            <UserProfile
              backgroundColor="bg-white"
              borderColor="border-gray-300"
              user={user}
            />
          )}

          {user && user.role === UserRole.User && (
            <Link to="/cart" className="flex items-center justify-center gap-2">
              <div className="relative">
                <AiOutlineShoppingCart className="w-8 h-8" />
                {totalQuantity > 0 && (
                  <p className="absolute -top-[60%] -right-[50%] p-1 w-full h-full flex items-center justify-center rounded-full bg-red-400 text-white">
                    {totalQuantity}
                  </p>
                )}
              </div>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
