import { db } from "../firebase";
import { TileData } from "../types";

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

export const fetchUserTiles = async (userID: string) => {
  return db
    .collection("userData")
    .doc(userID)
    .collection("tiles")
    .get()
    .then(function (querySnapshot: any) {
      const tiles: TileData[] = [];
      querySnapshot.forEach(function (doc: any) {
        tiles.push({ date: doc.data().date as Date, ...doc.data() });
      });
      return tiles;
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
