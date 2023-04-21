import { useEffect, useState } from "react";
import { checkAuth } from "../../../utils/checkAuth";
import { useRouter } from "next/router";
import classes from "./Tables.module.scss";
import Title from "../../../components/UI/Title/Title";

const tables = () => {
  const router = useRouter();

  const [tables, setTables] = useState([]);

  useEffect(() => {
    const auth = checkAuth();

    if (auth) return;

    router.push("/");
  }, []);
  return (
    <div className={classes.wrapper}>
      {!tables.length && (
        <div className={classes.wrapper_empty}>
          <div className={classes.wrapper_title}>
            <Title>Создай свою первую таблицу</Title>
          </div>
          <div
            onClick={() => {
              router.push("/table/create");
            }}
            className={classes.empty_card}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.75 0C14.1977 0 13.75 0.447715 13.75 1V12.75C13.75 13.3023 13.3023 13.75 12.75 13.75H1C0.447715 13.75 0 14.1977 0 14.75V15.25C0 15.8023 0.447715 16.25 1 16.25H12.75C13.3023 16.25 13.75 16.6977 13.75 17.25V29C13.75 29.5523 14.1977 30 14.75 30H15.25C15.8023 30 16.25 29.5523 16.25 29V17.25C16.25 16.6977 16.6977 16.25 17.25 16.25H29C29.5523 16.25 30 15.8023 30 15.25V14.75C30 14.1977 29.5523 13.75 29 13.75H17.25C16.6977 13.75 16.25 13.3023 16.25 12.75V1C16.25 0.447715 15.8023 0 15.25 0H14.75Z"
                fill="#737373"
              />
            </svg>
          </div>
        </div>
      )}
      {!!tables.length && <h1>Таблицы найдены</h1>}
    </div>
  );
};

export default tables;
