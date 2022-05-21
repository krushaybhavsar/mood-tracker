import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import MoodTile from "../components/MoodTile";
import { fetchUserTiles } from "../tools/firebaseTools";
import { TileData } from "../types";
import "./TileScreen.css";

type TileScreenProps = {
  userLoggedIn: boolean;
  userID: string | undefined;
};

const TileScreen = (props: TileScreenProps): ReactElement<TileScreenProps> => {
  const [tiles, setTiles] = useState<TileData[]>([]);

  useEffect(() => {
    if (props.userLoggedIn && props.userID) {
      fetchUserTiles(props.userID)
        .then((data) => {
          console.log(data);
          setTiles(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.userLoggedIn]);

  return (
    <div className="tile-screen">
      {props.userLoggedIn ? (
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
