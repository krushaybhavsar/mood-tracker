import React, { useEffect, useState } from "react";
import MoodTile from "../components/MoodTile";
import { fetchUserTiles } from "../tools/firebaseTools";
import "./TileScreen.css";

const TileScreen = ({ userLoggedIn, userID }) => {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    if (userLoggedIn && userID) {
      fetchUserTiles(userID)
        .then((data) => {
          console.log(data);
          setTiles(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userLoggedIn]);

  return (
    <div className="tile-screen">
      {userLoggedIn ? (
        <div className="tile-container">{/* <MoodTile score={} /> */}</div>
      ) : (
        <div className="screen-login">
          <h1>Login to view your board and add entries!</h1>
        </div>
      )}
    </div>
  );
};

export default TileScreen;
