import React from "react";
import { ReactElement } from "react";
import { TileData } from "../types";

type MoodTileProps = TileData;

const MoodTile = (props: MoodTileProps): ReactElement<MoodTileProps> => {
  return <div className="mood-tile"></div>;
};

export default MoodTile;
