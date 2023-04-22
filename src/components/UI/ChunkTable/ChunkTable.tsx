import clsx from "clsx";
import { FC, useState, useEffect, InputHTMLAttributes } from "react";
import classes from "./ChunkTable.module.scss";

interface IChunkTable extends InputHTMLAttributes<HTMLInputElement> {
  isHeader: boolean;
}

const ChunkTable: FC<IChunkTable> = ({ isHeader, ...props }) => {
  const [styles, setStyles] = useState(clsx(classes.input));

  useEffect(() => {
    setStyles(clsx(classes.input));
  }, [isHeader]);

  return <input className={styles} disabled={isHeader} {...props} />;
};

export default ChunkTable;
