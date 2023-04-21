import { FC, useState, ButtonHTMLAttributes } from "react";
import classes from "./DomiantButton.module.scss";

interface IDomiantButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const DomiantButton: FC<IDomiantButton> = (props) => {
  const [styles, setStyles] = useState(classes.button);

  return (
    <button className={styles} {...props}>
      {props.children}
    </button>
  );
};

export default DomiantButton;
