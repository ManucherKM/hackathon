import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./Online.module.scss";
import { useStore } from "@/store";
import Title from "@/components/UI/Title/Title";
import Link from "next/link";
import DomiantButton from "@/components/UI/DomiantButton/DomiantButton";
import ChunkTable from "@/components/UI/ChunkTable/ChunkTable";

const dataTables = [
  ["№", "Тема", "Кол-во часов"],
  ["1", "Перцептрон", "8"],
  ["2", "Перцептрон", "8"],
  ["3", "Перцептрон", "8"],
  ["4", "Перцептрон", "8"],
  ["5", "Перцептрон", "8"],
  ["6", "Перцептрон", "8"],
];

const Tables = () => {
  const user = useStore((state) => state.user);
  const [] = useState(dataTables);

  const router = useRouter();

  useEffect(() => {
    const auth = !!user.token;

    if (auth) return;

    router.push("/");
  }, [user]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper_title}>
        <Link href={"/table/create"}>
          <Title>Назад</Title>
        </Link>
      </div>

      <div className={classes.table}>
        <ChunkTable isHeader={true} value="qweqwe" />
      </div>

      <div className={classes.wrapper_bottom}>
        <DomiantButton>Подтвердить</DomiantButton>
      </div>
    </div>
  );
};

export default Tables;
