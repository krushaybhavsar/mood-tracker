import React from "react";
import "./MoodTile.css";
import { ReactElement } from "react";
import { TileData } from "../types";
import moment from "moment";

type MoodTileProps = {
  data: TileData;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MoodTile = (props: MoodTileProps): ReactElement<MoodTileProps> => {
  const colors = ["#ec2128", "#f35928", "#fcb03a", "#009348", "#21abe3"];
  const getBackgroundColor = (): string => {
    const { tileScore } = props.data;
    if (Math.round(tileScore) <= 2) {
      return colors[0];
    } else if (Math.round(tileScore) < 5) {
      return colors[1];
    } else if (Math.round(tileScore) < 7) {
      return colors[2];
    } else if (Math.round(tileScore) < 9) {
      return colors[3];
    }
    return colors[4];
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
    >
      {Math.round(props.data.tileScore)}
      {/* {moment(props.data.date).format("D")} */}
    </div>
  );
};

export default MoodTile;
