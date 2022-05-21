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

  const dummyTiles: TileData[] = [
    {
      id: "1",
      date: new Date(),
      tileScore: 2,
      socialRelationScore: 3,
      personalHealthScore: 3,
      professionScore: 5,
      academicScore: 8,
      familialRelationScore: 5,
      textNote: "Hello this is a test note",
      videoNote: "",
    },
    {
      id: "2",
      date: new Date(),
      tileScore: 4,
      socialRelationScore: 3,
      personalHealthScore: 3,
      professionScore: 5,
      academicScore: 8,
      familialRelationScore: 5,
      textNote: "Hello this is a test note",
      videoNote: "",
    },
    {
      id: "3",
      date: new Date(),
      tileScore: 5,
      socialRelationScore: 3,
      personalHealthScore: 3,
      professionScore: 5,
      academicScore: 8,
      familialRelationScore: 5,
      textNote: "Hello this is a test note",
      videoNote: "",
    },
    {
      id: "4",
      date: new Date(),
      tileScore: 6,
      socialRelationScore: 3,
      personalHealthScore: 3,
      professionScore: 5,
      academicScore: 8,
      familialRelationScore: 5,
      textNote: "Hello this is a test note",
      videoNote: "",
    },
    {
      id: "5",
      date: new Date(),
      tileScore: 8,
      socialRelationScore: 3,
      personalHealthScore: 3,
      professionScore: 5,
      academicScore: 8,
      familialRelationScore: 5,
      textNote: "Hello this is a test note",
      videoNote: "",
    },
    {
      id: "6",
      date: new Date(),
      tileScore: 9,
      socialRelationScore: 3,
      personalHealthScore: 3,
      professionScore: 5,
      academicScore: 8,
      familialRelationScore: 5,
      textNote: "Hello this is a test note",
      videoNote: "",
    },
  ];

  const months: { [key: string]: TileData[] } = {
    January: dummyTiles,
    February: dummyTiles,
    March: dummyTiles,
    April: dummyTiles,
    May: dummyTiles,
    June: dummyTiles,
    July: dummyTiles,
    August: dummyTiles,
    September: dummyTiles,
    October: dummyTiles,
    November: dummyTiles,
    December: dummyTiles,
  };

  useEffect(() => {
    loadTiles();
  }, []);

  // useEffect(() => {
  //   loadTiles();
  // }, [props.userLoggedIn]);

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
    props.setModalContent(<AddTileModalContent />);
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
                      {tiles[month].map((tile) => (
                        <MoodTile
                          key={tile.id}
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
