export type TileData = {
  id: string;
  date: Date;
  tileScore: number;
  socialRelationScore: number;
  personalHealthScore: number;
  professionScore: number;
  academicScore: number;
  familialRelationScore: number;
  textNote: string;
  videoNote: string;
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
