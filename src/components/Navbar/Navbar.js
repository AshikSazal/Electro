import { useState } from "react";
import { NavLink } from "react-router-dom";

import menu from "../../icons/menu.png";
import logo from "../../icons/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={menu} alt="" />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="show-category">
              <NavLink to="/product">Product</NavLink>
              <ul className="list">
                <li><NavLink to="/product/tv">Television</NavLink></li>
                <li><NavLink to="/product/mobile">Mobile</NavLink></li>
                <li><NavLink to="/product/laptop">Laptop</NavLink></li>
              </ul>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
