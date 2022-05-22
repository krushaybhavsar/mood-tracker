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

export const addUserTile = async (userID: string, tileData: TileDataRaw) => {
  // if tiledata.noteType is video, then upload video to storage
  if (tileData.noteType === "video") {
    getFileBlob(tileData.videoNote, async (blob: any) => {
      await storage
        .ref(`${userID}/${tileData.date}`)
        .put(blob)
        .then(async function (snapshot) {
          await storage
            .ref(`${userID}/${tileData.date}`)
            .getDownloadURL()
            .then(function (url: string) {
              //  get url here
              tileData.videoNote = url;
              firebaseVideoURLtoScore(url)
                .then(async (score: number) => {
                  tileData.tileScore = score;
                  await db
                    .collection("userData")
                    .doc(userID)
                    .collection("tiles")
                    .add(tileData)
                    .then(function (docRef: any) {
                      return docRef.id;
                    });
                })
                .catch(() => {});
            })
            .catch(function (error: any) {
              console.log(error);
            });
        });
    });
  } else {
    await textToScore(tileData.textNote)
      .then(async (score: number) => {
        tileData.tileScore = score;
        await db
          .collection("userData")
          .doc(userID)
          .collection("tiles")
          .add(tileData)
          .then(function (docRef: any) {
            return docRef.id;
          });
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }
};

var getFileBlob = function (url: string, cb: any) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.addEventListener("load", function () {
    let url = cb(xhr.response);
    console.log(url);
  });
  xhr.send();
};

const uploadToStorage = async (imageURL: string, path: string) => {};
