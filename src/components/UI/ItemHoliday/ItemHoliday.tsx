import { FC, useState, HTMLAttributes } from "react";
import classes from "./ItemHoliday.module.scss";

interface IItemHoliday extends HTMLAttributes<HTMLSpanElement> {
  getItem: (date: string) => void;
}

const ItemHoliday: FC<IItemHoliday> = ({ getItem, ...props }) => {
  const [styles, setStyles] = useState(classes.item);

  return (
    <div
      onClick={() => {
        getItem(props.children as string);
        
      }}
      className={styles}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default ItemHoliday;
