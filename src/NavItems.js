import React, { Component } from "react";
import { keyframes } from "styled-components";

class NavItems extends Component {
  state = {
    navTitle: [
      {
        id: 1,
        text: "Home",
      },
      {
        id: 2,
        text: "About",
      },
      {
        id: 3,
        text: "Work",
      },
      {
        id: 4,
        text: "Projects",
      },
    ],
  };

  render() {
    const navItems = this.state.navTitle;
    var navLinkFade = keyframes`
                0% { opacity: 0;transform: translate(50px); }
                100% { opacity: 1;transform: translateX(0px) }
            `;

    return navItems.map((navItem, index) => {
      return (
        <li
          className="navLinksLi"
          style={{
            animation: `${navLinkFade} 0.5s ease forwards ${index / 7 + 0.3}s`,
          }}
        >
          <a href="#" key={index}>
            {navItem.text}
          </a>
        </li>
      );
    });
  }
}

// render(){
//     const navItems = ["Home", "About", "Work", "Projects"];

//     return navItems.map((value, index) => {

//     }),
// }

export default NavItems;
