import React from "react";
import { ReactElement } from "react";
import "./StatisticsScreen.css";

type StatisticsScreenProps = {
  userLoggedIn: boolean;
  userID: string | undefined;
};

const StatisticsScreen = (
  props: StatisticsScreenProps
): ReactElement<StatisticsScreenProps> => {
  return (
    <div className="statistics-screen">
      {props.userLoggedIn ? (
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
