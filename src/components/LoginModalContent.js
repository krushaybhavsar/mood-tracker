import React, { useState } from "react";
import "./LoginModalContent.css";
import { app, auth } from "../firebase";
import firebase from "firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const LoginModalContent = ({ setOpenModal }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [otpNum, setOtpNum] = useState("");

  const handleButtonClick = () => {
    console.log(phoneNum);
    if (!otpSent) {
      if (phoneNum !== "" && phoneNum.length >= 10) {
        // generateReCAPTCHA();
        // auth
        //   .signInWithPhoneNumber(phoneNum, window.recaptchaVerifier)
        //   .then((confirmationResult) => {
        //     window.confirmationResult = confirmationResult;
        //     setOtpSent(true);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      } else {
        console.log("Phone number is invalid");
      }
    } else {
      verifyOTP();
    }
  };

  const generateReCAPTCHA = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {},
      },
      app
    );
  };

  const verifyOTP = () => {
    if (otpNum.length === 6) {
      window.confirmationResult
        .confirm(otpNum)
        .then((result) => {
          console.log("Logged in successfully");
          setOpenModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h1 className="login-content-main-title">Login with Phone Number</h1>
      <div className="login-content-container">
        <div className="login-content-container-item">
          <h2 className="login-content-container-title">Phone Number</h2>
          {/* <input type="tel" onChange={(e) => setPhoneNum(e.target.value)} /> */}
          <PhoneInput value={phoneNum} onChange={(e) => setPhoneNum(e)} />
        </div>
        <div
          className={
            "login-content-container-item" + (!otpSent ? " hidden" : "")
          }
        >
          <h2 className="login-content-container-title">OTP Pin</h2>
          <input
            type="number"
            maxLength={6}
            value={otpNum}
            onChange={(e) => setOtpNum(e.target.value)}
          />
        </div>
        <div className="login-content-container-item">
          <div id="recaptcha-container" style={{ display: "none" }}></div>
          <button onClick={handleButtonClick}>
            {otpSent ? "Login" : "Send OTP"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModalContent;
