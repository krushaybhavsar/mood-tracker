import "./App.css";
import Navbar from "./components/Navbar";
import TileScreen from "./pages/TileScreen";
import LinkNotFoundScreen from "./pages/LinkNotFoundScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import StatisticsScreen from "./pages/StatisticsScreen";
import CustomModal from "./components/CustomModal";

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(<div></div>);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
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
          <Route exact path="/" element={<TileScreen />} />
          <Route path="*" element={<LinkNotFoundScreen />} />
          <Route exact path="/statistics" element={<StatisticsScreen />} />
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
