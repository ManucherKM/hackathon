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

export interface IChunk {
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

  const formasd = useStore((state) => state.form);

  const getCount = initialCounter();

  const [colNum, setColNum] = useState<IChunk[]>(columnNumber);
  const [colName, setColName] = useState<IChunk[]>(columName);
  const [colTime, setColTime] = useState<IChunk[]>(columnTime);

  const setSendTables = useStore((state) => state.setTable);

  const [tables, setTables] = useState([colNum, colName, colTime]);

  function addRow() {
    setColNum((prev) => [
      ...prev,
      {
        isHeader: false,
        value: "",
        id: getUniqueKey(),
      },
    ]);

    setColName((prev) => [
      ...prev,
      {
        isHeader: false,
        value: "",
        id: getUniqueKey(),
      },
    ]);

    setColTime((prev) => [
      ...prev,
      {
        isHeader: false,
        value: "",
        id: getUniqueKey(),
      },
    ]);
  }

  const router = useRouter();

  function saveTable() {
    setSendTables(tables);
    router.push("/table/create");
  }

  useEffect(() => {
    const auth = !!user.token;
    console.log(formasd);

    if (user.tables?.length !== 0 && user.tables) {
      setColNum(user.tables[0]);
      setColName(user.tables[1]);
      setColTime(user.tables[2]);
    }

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
        <DomiantButton onClick={saveTable}>Подтвердить</DomiantButton>
      </div>
    </div>
  );
};

export default Tables;

const o = {
  lessons: {
    1: {
      name: "Вводное занятие. Техника безопасности. Что такое программирование",
      hours: 1,
    },
    2: { name: "Начало работы со Scratch", hours: 1 },
    3: { name: "Начинаем работать с программой. Блок «Движение» ", hours: 2 },
    4: { name: "Что такое алгоритм?", hours: 3 },
    5: { name: "Блок «События»", hours: 1 },
    6: {
      name: "Работа с объектами. Простые циклы. Блок «Внешность»",
      hours: 8,
    },
    7: { name: "Создание нового спрайта", hours: 4 },
    8: { name: "Вложенные циклы", hours: 3 },
    9: { name: "Переменные. Блок «Данные»", hours: 3 },
    10: { name: "Вычисления. Блок «Операторы»", hours: 3 },
    11: { name: "Строки и списки. Блок «Сенсоры»", hours: 4 },
    12: { name: "Обмен сообщениями", hours: 4 },
    13: { name: "Координаты", hours: 4 },
    14: { name: "Итоговое тестирование", hours: 1 },
  },
  all_hours: 42,
};
