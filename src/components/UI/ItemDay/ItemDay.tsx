import { FC, useState, HTMLAttributes, useEffect } from "react";
import classes from "./ItemDay.module.scss";
import { clsx } from "clsx";

interface IItemDay extends HTMLAttributes<HTMLDivElement> {
  setActive: (day: string) => void;
  isActive: boolean;
}

const ItemDay: FC<IItemDay> = ({ setActive, isActive, ...props }) => {
  const [styles, setStyles] = useState(
    clsx(classes.item, isActive && classes.active)
  );

  useEffect(() => {
    setStyles(clsx(classes.item, isActive && classes.active));
  }, [isActive]);
  return (
    <div
      onClick={() => {
        setActive(props.children as string);
      }}
      className={styles}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default ItemDay;
