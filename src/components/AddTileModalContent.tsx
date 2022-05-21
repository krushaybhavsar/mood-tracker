import React, { useState } from "react";
import "./AddTileModalContent.css";

function AddTileModalContent() {
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

  const [selectedMood, setSelectedMood] = useState<number>();
  const [selectedReason, setSelectedReason] = useState<number>();

  return (
    <>
      <h1>Add a New Tile</h1>
      <div className="nt-content-container">
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
              <div
                className={
                  "reason-option" +
                  (index === selectedReason ? " selected" : "")
                }
                onClick={() => setSelectedReason(reasons.indexOf(reason))}
              >
                {reason}
              </div>
            ))}
          </div>
        </div>
        <div className="nt-content-container-item">
          <button>Add Tile</button>
        </div>
      </div>
    </>
  );
}

export default AddTileModalContent;
