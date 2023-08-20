import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiBook, BiShoppingBag } from "react-icons/bi";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuBookPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserProfile from "../navbar/UserProfile";
import StoryBoundLogo from "./../../assets/logo-storybound.jpg";

import NavLink from "./NavLink";

const NavbarAdmin = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  function closeNavbar() {
    setOpen(false);
  }

  return (
    <header className="w-full md:w-96 bg-white relative z-50">
      <nav className="flex items-center justify-between md:flex-col flex-row">
        <div className="flex items-center justify-normal gap-5">
          <button
            className="block md:hidden ml-5"
            onClick={() => setOpen(!open)}
          >
            {!open ? (
              <HiOutlineMenuAlt2 className="text-2xl cursor-pointer text-gray-700" />
            ) : (
              <AiOutlineClose className="text-2xl cursor-pointer text-gray-700" />
            )}
          </button>

          <Link to="/" className="flex items-center justify-center gap-3 my-8">
            <img src={StoryBoundLogo} alt="Logo" className="w-[140px]" />

            {/* <p className="font-semibold">Storybound</p> */}
          </Link>
        </div>

        <div
          className={`flex items-center justify-center flex-col absolute md:static bg-white w-full duration-200 p-5 ${
            open ? "top-[100%]" : "-top-[400px]"
          }`}
        >
          {user && (
            <div className="mb-7 hidden md:block">
              <UserProfile
                dropAtRight={true}
                backgroundColor="bg-white"
                borderColor="border-gray-300"
                user={user}
              />
            </div>
          )}

          <p className="mb-7 text-[#C2C2C2] text-sm">MAIN MENU</p>
          <ul>
            <li className="mb-5" onClick={closeNavbar}>
              <NavLink to="/add-book" Icon={LuBookPlus} linkName="Add Book" />
            </li>

            <li className="mb-5" onClick={closeNavbar}>
              <NavLink to="/books" Icon={BiBook} linkName="Books" />
            </li>

            <li className="mb-5" onClick={closeNavbar}>
              <NavLink
                to="/all-orders"
                Icon={BiShoppingBag}
                linkName="Orders"
              />
            </li>
            <li className="mb-5" onClick={closeNavbar}>
              <NavLink to="/users" Icon={FiUsers} linkName="Users" />
            </li>
            <li onClick={closeNavbar}>
              <NavLink to="/add-user" Icon={FiUserPlus} linkName="Add User" />
            </li>
          </ul>
        </div>

        {user && (
          <div className="md:hidden flex items-center justify-center gap-5 mr-5">
            <UserProfile
              user={user}
              backgroundColor="bg-white"
              borderColor="border-gray-300"
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavbarAdmin;
