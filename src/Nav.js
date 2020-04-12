import React, { useState } from "react";
import style from "./Nav.module.css";
import NavItems from "./NavItems";

const Nav = () => {
  const [isOpened, setIsOpened] = useState(false);

  function navSlide(e) {
    // e.preventDefault();

    if (isOpened) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  }

  return (
    <nav>
      <div className={style.logo}>
        <h4>Ingredients</h4>
      </div>

      <ul
        className={
          isOpened === true
            ? `${style.navLinks} ${style.navActive}`
            : style.navLinks
        }
      >
        <NavItems />
      </ul>

      <div className={style.burger} onClick={navSlide}>
        <div className={style.line1}></div>
        <div className={style.line2}></div>
        <div className={style.line3}></div>
      </div>
    </nav>
  );
};

export default Nav;
