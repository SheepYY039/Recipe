import React from "react";
import styled, { keyframes } from "styled-components";

const NavItems = ({ name, index }) => {
  const time = `${index}` / 7 + 0.3 + "s";

  var navLinkFade = keyframes`
  0% { opacity: 0; transform: translate(50px); }
  100% { opacity: 1; transform: translateX(0px); }
  `;
  const NavListItem = styled.li`
    animation: ${navLinkFade} 0.5s ${time} forwards ease;
  `;

  return <NavListItem key={index}>{name}</NavListItem>;
};

export default NavItems;
