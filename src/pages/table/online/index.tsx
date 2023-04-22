import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./Online.module.scss";
import { useStore } from "@/store";
import Title from "@/components/UI/Title/Title";
import Link from "next/link";
import DomiantButton from "@/components/UI/DomiantButton/DomiantButton";
import ChunkTable from "@/components/UI/ChunkTable/ChunkTable";
import { getUniqueKey } from "@/utils/getUniqueKey";
import AnotherButton from "@/components/UI/AnotherButton/AnotherButton";

interface IChunk {
  id: string;
  value: string;
  isHeader: boolean;
}

const columnNumber: IChunk[] = [
  {
    id: getUniqueKey(),
    value: "№",
    isHeader: true,
  },
];

const columName: IChunk[] = [
  {
    id: getUniqueKey(),
    value: "Тема",
    isHeader: true,
  },
];

const columnTime: IChunk[] = [
  {
    id: getUniqueKey(),
    value: "Кол-во часов",
    isHeader: true,
  },
];

function initialCounter() {
  let count = 1;

  return function () {
    return ++count;
  };
}

const Tables = () => {
  const user = useStore((state) => state.user);

  const getCount = initialCounter();

  const [colNum, setColNum] = useState<IChunk[]>(columnNumber);
  const [colName, setColName] = useState<IChunk[]>(columName);
  const [colTime, setColTime] = useState<IChunk[]>(columnTime);

  const [tables, setTables] = useState([colNum, colName, colTime]);

  function addRow() {
    const newChunk: IChunk = {
      isHeader: false,
      value: "",
      id: getUniqueKey() + Date.now(),
    };

    setColNum((prev) => [...prev, newChunk]);
    setColName((prev) => [...prev, newChunk]);
    setColTime((prev) => [...prev, newChunk]);
  }

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
        <div className={classes.table_nums}>
          {!!colNum.length
            ? colNum.map((chunk, chunkIdx) => {
                return (
                  <ChunkTable
                    key={chunk.id}
                    isHeader={chunk.isHeader}
                    value={(!chunkIdx && chunk.value) || chunkIdx}
                    style={{ textAlign: "center" }}
                    tabIndex={getCount()}
                    onChange={() => {}}
                  />
                );
              })
            : [
                ...colNum,
                {
                  value: "1",
                  isHeader: false,
                  id: Date.now(),
                },
              ].map((chunk, chunkIdx) => {
                return (
                  <ChunkTable
                    key={chunk.id}
                    isHeader={chunk.isHeader}
                    value={(!chunkIdx && chunk.value) || chunkIdx}
                    style={{ textAlign: "center" }}
                    tabIndex={getCount()}
                    onChange={() => {}}
                  />
                );
              })}
        </div>

        <div className={classes.table_names}>
          {colName.map((chunk, chunkIdx) => {
            return (
              <ChunkTable
                key={chunk.id}
                isHeader={chunk.isHeader}
                value={chunk.value}
                style={{ textAlign: "center" }}
                tabIndex={getCount()}
                onChange={(e) => {
                  const newTable = [...colName];
                  console.log(colName);

                  newTable[chunkIdx].value = e.target.value;

                  setColName(newTable);
                }}
              />
            );
          })}
        </div>

        <div className={classes.table_hours}>
          {colTime.map((chunk, chunkIdx) => {
            return (
              <ChunkTable
                key={chunk.id}
                isHeader={chunk.isHeader}
                value={chunk.value}
                style={{ textAlign: "center" }}
                tabIndex={getCount()}
                onChange={(e) => {
                  const newTable = [...colTime];
                  console.log(colTime);

                  newTable[chunkIdx].value = e.target.value;

                  setColTime(newTable);
                }}
              />
            );
          })}
        </div>
      </div>

      <div className={classes.wrapper_btn_add}>
        <AnotherButton onClick={addRow}>Добавить</AnotherButton>
      </div>
      <div className={classes.wrapper_bottom}>
        <DomiantButton>Подтвердить</DomiantButton>
      </div>
    </div>
  );
};

export default Tables;
