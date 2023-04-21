import { FC, useState, InputHTMLAttributes } from "react";
import classes from "./DefaultInput.module.scss";

interface IDefaultInput extends InputHTMLAttributes<HTMLInputElement> {}

const DefaultInput: FC<IDefaultInput> = (props) => {
  const [styles, setStyles] = useState(classes.input);

  return <input className={styles} type="text" {...props} />;
};

export default DefaultInput;
