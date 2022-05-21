import "./App.css";
import Navbar from "./components/Navbar";
import TileScreen from "./pages/TileScreen";
import LinkNotFoundScreen from "./pages/LinkNotFoundScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import StatisticsScreen from "./pages/StatisticsScreen";
import CustomModal from "./components/CustomModal";
import { fetchUserData } from "./tools/firebaseTools";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(<div></div>);
  const [userID, setUserID] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
        fetchUserData(user.uid)
          .then((data) => {
            setUserID(data.userID);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUserLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar
          userLoggedIn={userLoggedIn}
          setModalContent={setModalContent}
          setOpenModal={setOpenModal}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<TileScreen userLoggedIn={userLoggedIn} userID={userID} />}
          />
          <Route
            exact
            path="/statistics"
            element={
              <StatisticsScreen userLoggedIn={userLoggedIn} userID={userID} />
            }
          />
          <Route path="*" element={<LinkNotFoundScreen />} />
        </Routes>
        <CustomModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalContent={modalContent}
        />
      </Router>
    </div>
  );
};

export default App;
