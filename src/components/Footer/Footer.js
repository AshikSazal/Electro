import React from "react";
import { NavLink } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-list">
        <section>
          <NavLink to="/support">Support</NavLink>
        </section>
        <section>
          <NavLink to="/policy">Privacy Policy</NavLink>
        </section>
        <section>
          <NavLink to="/service">Terms of service</NavLink>
        </section>
      </div>
      <div className="copyright">
        <section>&copy; Copyright 2023. All rights reserved.</section>
      </div>
    </div>
  );
};

export default Footer;
