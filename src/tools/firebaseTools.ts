import { db } from "../firebase";
import { TileData, TileDataList } from "../types";
import moment from "moment";

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
        month = moment(data.date.toDate()).format("MMMM");
        tileListData[month].push(data);
      });
      // iterate through months and sort by date
      // Object.keys(tileListData).forEach((key: string) => {
      //   tileListData[key] = tileListData[key].sort(
      //     (a: TileData, b: TileData) => {
      //       return new Date(a.date).getTime() - new Date(b.date).getTime();
      //     }
      //   );
      // });
      return tileListData as TileDataList;
    });
};

export const addUserTile = async (userID: string, tileData: TileData) => {
  return db
    .collection("userData")
    .doc(userID)
    .collection("tiles")
    .add(tileData)
    .then(function (docRef: any) {
      return docRef.id;
    });
};
