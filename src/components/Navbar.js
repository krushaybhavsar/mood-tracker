import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userLoggedIn, setModalContent, setOpenModal }) => {
  return (
    <div className="navbar">
      <h1 className="navbar-logo">Mood Tracker</h1>
      <div className="navbar-link-container">
        <NavLink className="navbar-link" to={"/"}>
          Tile Grid
        </NavLink>
        <NavLink className="navbar-link" to={"/statistics"}>
          Statistics
        </NavLink>
        <div className="navbar-link">{userLoggedIn ? "Log out" : "Log in"}</div>
      </div>
    </div>
  );
};

export default Navbar;
