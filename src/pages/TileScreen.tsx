import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import AddTileModalContent from "../components/AddTileModalContent";
import MoodTile from "../components/MoodTile";
import { fetchUserTiles } from "../tools/firebaseTools";
import { TileData, TileDataList } from "../types";
import "./TileScreen.css";

type TileScreenProps = {
  userLoggedIn: boolean;
  userID: string | undefined;
  openModal: boolean;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TileScreen = (props: TileScreenProps): ReactElement<TileScreenProps> => {
  const [tiles, setTiles] = useState<TileDataList>({});
  const [addTileRefresher, setAddTileRefresher] = useState<number>(0);

  useEffect(() => {
    loadTiles();
  }, [props.userID, addTileRefresher]);

  const loadTiles = async () => {
    if (props.userLoggedIn && props.userID) {
      await fetchUserTiles(props.userID)
        .then((data: TileDataList) => {
          // console.log(data);
          setTiles(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAddFAB = () => {
    props.setModalContent(
      <AddTileModalContent
        setOpenModal={props.setOpenModal}
        setAddTileRefresher={setAddTileRefresher}
        addTileRefresher={addTileRefresher}
        setModalContent={props.setModalContent}
        userID={props.userID}
      />
    );
    props.setOpenModal(true);
  };

  return (
    <div className="tile-screen">
      {props.userLoggedIn ? (
        <>
          <div className="tile-screen-header">
            <h1>2022</h1>
          </div>
          <div className="tile-screen-months-container">
            {Object.keys(tiles).map(
              (month, i) =>
                tiles[month].length !== 0 && (
                  <div key={i} className="month-tile-container">
                    <h2 className="tile-screen-month-title">{month}</h2>
                    <div className="tile-container">
                      {tiles[month].map((tile, index) => (
                        <MoodTile
                          key={index}
                          data={tile}
                          setModalContent={props.setModalContent}
                          setOpenModal={props.setOpenModal}
                        />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
          <button
            className={"add-tile-fab" + (props.openModal ? " hide" : "")}
            onClick={handleAddFAB}
          >
            <div className="vert" />
            <div className="hori" />
          </button>
        </>
      ) : (
        <div className={"screen-login"}>
          <h1>Login to view your board and add entries!</h1>
        </div>
      )}
    </div>
  );
};

export default TileScreen;
