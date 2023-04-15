import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../shared/hooks/auth-hook";
import menu from "../../icons/menu.png";
import logo from "../../icons/logo.png";
import sign_in from "../../icons/sign_in.png";
import HeaderCart from "../HeaderCart/HeaderCart";
import "./Navbar.css";

const Navbar = () => {
  const { role, logoutHandler } = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    if (!showNavbar) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "";
    }
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
                <li>
                  <NavLink to="/product/tv">Television</NavLink>
                </li>
                <li>
                  <NavLink to="/product/mobile">Mobile</NavLink>
                </li>
                <li>
                  <NavLink to="/product/laptop">Laptop</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <HeaderCart />
              </NavLink>
            </li>
            <li className="show-logout">
              {+role === 3 ? (
                <>
                  <img src={sign_in} alt="" />
                  <ul className="logout">
                    <li>
                      <button className="btn" onClick={logoutHandler}>Log out</button>
                    </li>
                  </ul>
                </>
              ) : (
                <NavLink to="/auth">Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
