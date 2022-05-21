import React, { ReactElement } from "react";
import "./CustomModal.css";

type CustomModalProps = {
  modalContent: JSX.Element;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomModal = (
  props: CustomModalProps
): ReactElement<CustomModalProps> => {
  return (
    <div
      className={"modal-background" + (props.openModal ? " open" : "")}
      onClick={() => props.setOpenModal(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {props.modalContent}
      </div>
    </div>
  );
};

export default CustomModal;
