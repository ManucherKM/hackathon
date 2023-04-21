import { FC, HTMLAttributes } from "react";
import classes from "./Modal.module.scss";

interface IModal extends HTMLAttributes<HTMLDivElement> {
  setVisible?: (visible: boolean) => void;
}

const Modal: FC<IModal> = ({ setVisible, ...props }) => {
  return (
    <div
      onClick={() => {
        setVisible && setVisible(false);
      }}
      className={classes.wrapper_modal}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.modal}
        {...props}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
