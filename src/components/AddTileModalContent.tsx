import React, { useState } from "react";
import { ReactElement } from "react";
import "./AddTileModalContent.css";

type AddTileModalContentProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddTileModalContent(
  props: AddTileModalContentProps
): ReactElement<AddTileModalContentProps> {
  const images = [
    "mood1.png",
    "mood2.png",
    "mood3.png",
    "mood4.png",
    "mood5.png",
  ];
  const reasons = [
    "Friends or Colleagues",
    "Personal Health",
    "Work",
    "Academics",
    "Family",
  ];
  const colors = ["#ec2128", "#f35928", "#fcb03a", "#009348", "#21abe3"];
  const [selectedMood, setSelectedMood] = useState<number>(-1);
  const [selectedReason, setSelectedReason] = useState<number>(-1);
  const [stepNum, setStepNum] = useState<number>(1);
  const [notesMethod, setNotesMethod] = useState<"Text" | "Video">("Text");

  const handleButton = () => {
    if (stepNum === 1) {
      setStepNum(2);
    } else {
      props.setOpenModal(false);
    }
  };

  const checkValidInput = () => {
    if (selectedMood !== -1 && selectedReason !== -1) {
      return true;
    }
    return false;
  };

  const getStep1Content = () => {
    return (
      <>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">
            How were you feeling today?
          </h2>
          <div className="mood-images-container">
            {images.map((image, index) => (
              <img
                className={
                  "mood-image" + (index === selectedMood ? " selected" : "")
                }
                src={require(`../assets/${image}`)}
                alt="mood"
                onClick={() => setSelectedMood(images.indexOf(image))}
              />
            ))}
          </div>
        </div>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">
            Which of the following options most accurately describes the reason
            for this mood?
          </h2>
          <div className="reason-options-container">
            {reasons.map((reason, index) => (
              <p
                className={
                  "reason-option" +
                  (index === selectedReason ? " selected" : "")
                }
                onClick={() => setSelectedReason(reasons.indexOf(reason))}
              >
                {reason}
              </p>
            ))}
          </div>
        </div>
      </>
    );
  };

  const getStep2Content = () => {
    return (
      <>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">
            Select a medium to express yourself in
          </h2>
          <div className="nt-content-notes-options-container">
            <p
              className={
                "nt-content-notes-option" +
                (notesMethod === "Text" ? " selected" : "")
              }
              onClick={() => setNotesMethod("Text")}
            >
              Text
            </p>
            <p
              className={
                "nt-content-notes-option" +
                (notesMethod === "Video" ? " selected" : "")
              }
              onClick={() => setNotesMethod("Video")}
            >
              Video
            </p>
          </div>
        </div>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">Describe your day</h2>
          {notesMethod === "Text" ? (
            <textarea className="nt-content-notes-textarea" />
          ) : (
            <div className="nt-content-notes-video-container"></div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <h1>Add a New Tile</h1>
      <div className="nt-content-container">
        {stepNum === 1 ? getStep1Content() : getStep2Content()}
        <div className="nt-content-container-item">
          <button onClick={handleButton} disabled={!checkValidInput()}>
            {stepNum === 1 ? "Next" : "Add Tile"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTileModalContent;
