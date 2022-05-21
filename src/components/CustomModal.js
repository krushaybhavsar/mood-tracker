import React from "react";

const CustomModal = ({ modalContent, openModal, setOpenModal }) => {
  return (
    <div className={"modal-background" + (openModal ? " open" : "")}>
      <div className="modal-content">{modalContent}</div>
    </div>
  );
};

export default CustomModal;
