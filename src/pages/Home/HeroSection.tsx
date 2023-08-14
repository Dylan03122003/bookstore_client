import React from "react";

import { BiSearchAlt } from "react-icons/bi";
import SearchBook from "../../components/book/SearchBook";
import { useAuth } from "../../hooks/useAuth";
import AnhBook from "./../../assets/anhBook.png";
import TruyCap from "./../../assets/truycap.png";
import style from "./HeroSectionStyle.module.css";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <div className={style["heroSection"]}>
      <div className={style["content_hero"]}>
        <h1>
          Find and Buy your favourite book from{" "}
          <span style={{ color: "#dd6367" }}>Our Store</span>
        </h1>
        <p className="text-gray-500">
          Discover affordable books at our store, where passion meets knowledge.
          Enjoy a diverse selection of high-quality reads without breaking the
          bank. Join us and find your perfect book today!
        </p>
        <div className={`${style.hero_bottom}`}>
          <a href="" className="text-base">
            <BiSearchAlt className="w-6 h-6 mr-2" />
            Search Book
          </a>

          <div className={style.user_buy}>
            <img src={TruyCap} alt="" />
            <p>
              <span style={{ fontWeight: "bolder", color: "#dd6367" }}>
                10,000+
              </span>{" "}
              people have made purchases.
            </p>
          </div>

          <div className="lg:hidden block mx-auto">
            {user !== null && <SearchBook />}
          </div>
        </div>
      </div>
      <img className={style.img_hero} src={AnhBook} alt=""></img>
    </div>
  );
};

export default HeroSection;
