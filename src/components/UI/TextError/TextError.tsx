import { FC, useState, HTMLAttributes } from "react";
import classes from "./TextError.module.scss";

interface ITextError extends HTMLAttributes<HTMLSpanElement> {}

const TextError: FC<ITextError> = (props) => {
  const [styles, setStyles] = useState(classes.span);

  return (
    <span className={styles} {...props}>
      {props.children}
    </span>
  );
};

export default TextError;
