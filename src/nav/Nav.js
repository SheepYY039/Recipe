import React, { useState } from "react";
import style from "./Nav.module.css";
import NavPrint from "./NavPrint";

const Nav = () => {
  const isMobile = window.innerWidth < 768;

  const navItems = [
    { id: 1, name: "Home" },
    { id: 2, name: "About" },
    { id: 3, name: "Recipe" },
    { id: 4, name: "Contact" },
  ];

  const [isOpened, setIsOpened] = useState(false);

  function navSlide() {
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
        <NavPrint navItems={navItems} isMobile={isMobile} />
      </ul>

      <div
        onClick={navSlide}
        className={
          isOpened === false ? style.burger : `${style.burger} ${style.toggle}`
        }
      >
        <div className={style.line1}></div>
        <div className={style.line2}></div>
        <div className={style.line3}></div>
      </div>
    </nav>
  );
};

export default Nav;
