import { FC, useState, ButtonHTMLAttributes } from "react";
import classes from "./AnotherButton.module.scss";

interface IAnotherButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const AnotherButton: FC<IAnotherButton> = (props) => {
  const [styles, setStyles] = useState(classes.button);

  return (
    <button className={styles} {...props}>
      {props.children}
    </button>
  );
};

export default AnotherButton;
