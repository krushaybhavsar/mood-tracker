import React from "react";
import "./MoodTile.css";
import { ReactElement } from "react";
import { TileData } from "../types";

type MoodTileProps = {
  data: TileData;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MoodTile = (props: MoodTileProps): ReactElement<MoodTileProps> => {
  const getBackgroundColor = (): string => {
    const { tileScore } = props.data;
    if (tileScore < 3) {
      return "#f54336";
    } else if (tileScore < 5) {
      return "#ff981f";
    } else if (tileScore < 7) {
      return "#ffd300";
    } else {
      return "#8bc255";
    }
  };

  const handleTileClick = () => {
    props.setModalContent(getModalContent());
    props.setOpenModal(true);
  };

  const getModalContent = () => {
    return <div>{props.data.tileScore}</div>;
  };

  return (
    <div
      className="mood-tile"
      onClick={handleTileClick}
      style={{ backgroundColor: getBackgroundColor() }}
    ></div>
  );
};

export default MoodTile;
