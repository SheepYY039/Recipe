import React from "react";
import NavItems from "./NavItems";

export default class NavPrint extends React.Component {
  render() {
    if (this.props.isMobile) {
      return this.props.navItems.map((navItem) => (
        <NavItems name={navItem.name} index={navItem.id} />
      ));
    } else {
      return this.props.navItems.map((navItem) => (
        <li key={navItem.id}>{navItem.name}</li>
      ));
    }
  }
}
