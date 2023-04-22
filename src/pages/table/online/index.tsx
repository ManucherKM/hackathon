import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import classes from "./Online.module.scss";
import { useStore } from "@/store";
import Title from "@/components/UI/Title/Title";
import Link from "next/link";
import DomiantButton from "@/components/UI/DomiantButton/DomiantButton";
import ChunkTable from "@/components/UI/ChunkTable/ChunkTable";
import { getUniqueKey } from "@/utils/getUniqueKey";

const dataTables = [
  [
    {
      value: "№",
      isHeader: true,
    },
    {
      value: "Тема",
      isHeader: true,
    },
    {
      value: "Кол-во часов",
      isHeader: true,
    },
  ],
  [
    {
      value: "1",
      isHeader: false,
    },
    {
      value: "Перцептрон",
      isHeader: false,
    },
    {
      value: "8",
      isHeader: false,
    },
  ],
  [
    {
      value: "1",
      isHeader: false,
    },
    {
      value: "Перцептрон",
      isHeader: false,
    },
    {
      value: "8",
      isHeader: false,
    },
  ],
  [
    {
      value: "1",
      isHeader: false,
    },
    {
      value: "Перцептрон",
      isHeader: false,
    },
    {
      value: "8",
      isHeader: false,
    },
  ],
  [
    {
      value: "1",
      isHeader: false,
    },
    {
      value: "Перцептрон",
      isHeader: false,
    },
    {
      value: "8",
      isHeader: false,
    },
  ],
];

interface IChunk {
  value: string;
  isHeader: boolean;
}

function initialCounter() {
  let count = 1;

  return function () {
    return ++count;
  };
}

const Tables = () => {
  const user = useStore((state) => state.user);
  const getCount = initialCounter();

  const [tables, setTables] = useState<IChunk[][]>(dataTables);

  function changeHandler(
    e: ChangeEvent<HTMLInputElement>,
    rowIdx: number,
    chunkIdx: number
  ) {
    const newTable = [...tables];
    newTable[rowIdx][chunkIdx] = {
      ...newTable[rowIdx][chunkIdx],
      value: e.target.value,
    };
    setTables(newTable);
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
          {tables.map((row, rowIdx) =>
            row.map((chunk, chunkIdx) => {
              if (chunkIdx === 0) {
                return (
                  <ChunkTable
                    key={chunk.value + getUniqueKey()}
                    isHeader={chunk.isHeader}
                    value={(!chunkIdx && chunk.value) || rowIdx}
                    style={{ textAlign: "center" }}
                    tabIndex={getCount()}
                    onChange={() => {}}
                  />
                );
              }
            })
          )}
        </div>

        <div className={classes.table_names}>
          {tables.map((row, rowIdx) =>
            row.map((chunk, chunkIdx) => {
              if (chunkIdx === 1) {
                return (
                  <ChunkTable
                    key={chunk.value + getUniqueKey()}
                    isHeader={chunk.isHeader}
                    value={chunk.value}
                    style={{ textAlign: "center" }}
                    tabIndex={getCount()}
                    onChange={(e) => changeHandler(e, rowIdx, chunkIdx)}
                  />
                );
              }
            })
          )}
        </div>

        <div className={classes.table_hours}></div>
      </div>

      <div className={classes.wrapper_bottom}>
        <DomiantButton>Подтвердить</DomiantButton>
      </div>
    </div>
  );
};

export default Tables;
