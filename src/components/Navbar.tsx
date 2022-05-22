import React from "react";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import LoginModalContent from "./LoginModalContent";
import "./Navbar.css";

type NavbarProps = {
  userLoggedIn: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

const Navbar = (props: NavbarProps): ReactElement<NavbarProps> => {
  const handleLoginModal = () => {
    if (!props.userLoggedIn) {
      props.setModalContent(
        <LoginModalContent
          setOpenModal={props.setOpenModal}
          setModalContent={props.setModalContent}
        />
      );
      props.setOpenModal(true);
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
          className={
            "navbar-link btn" + (props.userLoggedIn ? " log-out" : " ")
          }
          onClick={handleLoginModal}
        >
          {props.userLoggedIn ? "Log out" : "Log in"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
