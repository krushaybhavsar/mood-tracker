import { db, storage } from "../firebase";
import { TileData, TileDataList, TileDataRaw } from "../types";
import moment from "moment";
import { firebaseVideoURLtoScore, textToScore } from "./serverTools";

const newUserIntialData = (userID: string) => {
  return {
    userID: userID,
    socialRelationScore: 0,
    personalHealthScore: 0,
    professionScore: 0,
    academicScore: 0,
    familialRelationScore: 0,
  };
};

export const fetchUserData = async (userID: string) => {
  return db
    .collection("userData")
    .doc(userID)
    .get()
    .then(function (doc: any) {
      if (doc.exists) {
        // returning user --> fetch data
        return doc.data();
      } else {
        // new user --> create new doc
        return db
          .collection("userData")
          .doc(userID)
          .set(newUserIntialData(userID))
          .then(function () {
            return newUserIntialData(userID);
          })
          .catch(function (error: any) {
            console.error("Error writing document: ", error);
          });
      }
    });
};

export const fetchUserTiles = async (userID: string): Promise<TileDataList> => {
  const tileListData: any = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  };
  return db
    .collection("userData")
    .doc(userID)
    .collection("tiles")
    .get()
    .then(function (querySnapshot: any) {
      let data;
      let month = "";
      querySnapshot.forEach(function (doc: any) {
        data = doc.data();
        month = moment(data.date).format("MMMM");
        tileListData[month].push({ date: new Date(data.date), ...data });
      });
      // iterate through months and sort by date using moment
      Object.keys(tileListData).forEach((key: string) => {
        tileListData[key] = tileListData[key].sort((a: TileData, b: TileData) =>
          moment(a.date).isBefore(b.date) ? -1 : 1
        );
      });
      return tileListData as TileDataList;
    });
};

// const uploadToStorage = async (imageURL: string, path: string) => {};
