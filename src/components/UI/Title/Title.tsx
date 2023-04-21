import { FC, useState, HTMLAttributes } from "react";
import classes from "./Title.module.scss";

interface ITitle extends HTMLAttributes<HTMLSpanElement> {}

const Title: FC<ITitle> = (props) => {
  const [styles, setStyles] = useState(classes.span);

  return (
    <span className={styles} {...props}>
      {props.children}
    </span>
  );
};

export default Title;
