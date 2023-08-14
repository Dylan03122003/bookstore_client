import React from "react";
import { IconType } from "react-icons";

import { Link, useLocation } from "react-router-dom";

type NavLinkProps = {
  to: string;
  Icon: React.ElementType;
  linkName: string;
};

const NavLink = ({ to, Icon, linkName }: NavLinkProps) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`flex items-center justify-start py-2 px-4 rounded-md gap-2 ${
        location.pathname === to ? "bg-[#F3F4FD]" : "bg-white"
      }`}
    >
      <Icon
        className={`w-6 h-6 ${location.pathname === to ? "" : "text-gray-400"}`}
      />
      <p
        className={`font-medium ${
          location.pathname === to ? "" : "text-gray-400"
        }`}
      >
        {linkName}
      </p>
    </Link>
  );
};

export default NavLink;
