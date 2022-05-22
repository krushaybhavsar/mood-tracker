export type NoteType = "text" | "video";

export type TileData = {
  date: Date;
  tileScore: number;
  category: string;
  textNote: string;
  videoNote: string;
  noteType: NoteType;
};

export type TileDataRaw = {
  date: string;
  tileScore: number;
  category: string;
  textNote: string;
  videoNote: string;
  noteType: NoteType;
};

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TileDataList = {
  [key: string]: TileData[];
};
