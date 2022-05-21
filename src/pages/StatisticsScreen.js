import React from "react";
import "./StatisticsScreen.css";

const StatisticsScreen = ({ userLoggedIn, userID }) => {
  return (
    <div className="statistics-screen">
      {userLoggedIn ? (
        <div className="stat-container"></div>
      ) : (
        <div className="screen-login">
          <h1>Login to view your statistics and behavioral patterns!</h1>
        </div>
      )}
    </div>
  );
};

export default StatisticsScreen;
