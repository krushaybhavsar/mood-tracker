import React from "react";
import "./CustomModal.css";

const CustomModal = ({ modalContent, openModal, setOpenModal }) => {
  return (
    <div
      className={"modal-background" + (openModal ? " open" : "")}
      onClick={() => setOpenModal(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>
  );
};

export default CustomModal;
