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
    return colors[tileScore / 2 - 1];
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
      {props.data.tileScore}
      {/* {moment(props.data.date).format("D")} */}
    </div>
  );
};

export default MoodTile;
