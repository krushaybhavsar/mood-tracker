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
    console.log(props.data);
    return (
      <div className="mood-tile-modal-content">
        <h1>{moment(props.data.date).format("MMMM Do YYYY")}</h1>
        <h2>Category: {props.data.category}</h2>
        <h2 className="mood-tile-score">
          Score: {Math.round(props.data.tileScore * 100) / 100}
        </h2>
        {props.data.noteType === "text" ? (
            <h3>{props.data.textNote}</h3>
        ) : (
          <div className="nt-content-video-options">
            <video
              src={props.data.videoNote}
              controls
              autoPlay
              loop
              className="nt-content-video"
              width={350}
              height={200}
            />
          </div>
        )}
      </div>
    );
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
