import { db } from "../firebase";

const newUserIntialData = (userID) => {
  return {
    userID: userID,
    socialRelationScore: 0,
    personalHealthScore: 0,
    professionScore: 0,
    academicScore: 0,
    familialRelationScore: 0,
  };
};

export const fetchUserData = async (userID) => {
  return db
    .collection("userData")
    .doc(userID)
    .get()
    .then(function (doc) {
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
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
    });
};

export const fetchUserTiles = async (userID) => {
  return db
    .collection("userData")
    .doc(userID)
    .collection("tiles")
    .get()
    .then(function (querySnapshot) {
      const tiles = [];
      querySnapshot.forEach(function (doc) {
        tiles.push({ date: doc.data().date.toDate(), ...doc.data() });
      });
      return tiles;
    });
};

export const addUserTile = async (userID, tileData) => {
  return db
    .collection("userData")
    .doc(userID)
    .collection("tiles")
    .add(tileData)
    .then(function (docRef) {
      return docRef.id;
    });
};

/*
tileData = {
    id: "dsjksjfk",
    date: 2020-01-01,
    socialRelationScore: 0,
    personalHealthScore: 0,
    professionScore: 0,
    academicScore: 0,
    familialRelationScore: 0,
    textNote: "I am very sad today",
    videoNote: "[reference to firebase storage link]",
}
*/
