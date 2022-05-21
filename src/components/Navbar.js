import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import LoginModalContent from "./LoginModalContent";
import "./Navbar.css";

const Navbar = ({ userLoggedIn, setModalContent, setOpenModal }) => {
  const handleLoginModal = () => {
    if (!userLoggedIn) {
      setModalContent(<LoginModalContent setOpenModal={setOpenModal} />);
      setOpenModal(true);
    } else {
      // TODO: Logout
      auth.signOut();
    }
  };

  return (
    <div className="navbar">
      <h1 className="navbar-logo">Mind Board</h1>
      <div className="navbar-link-container">
        <NavLink className="navbar-link" to={"/"}>
          My Board
        </NavLink>
        <NavLink className="navbar-link" to={"/statistics"}>
          Statistics
        </NavLink>
        <button
          className={"navbar-link btn" + (userLoggedIn ? " log-out" : " ")}
          onClick={handleLoginModal}
        >
          {userLoggedIn ? "Log out" : "Log in"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
