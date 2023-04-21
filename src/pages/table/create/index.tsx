import { FC, useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "../../../utils/checkAuth";
import classes from "./Create.module.scss";
import Modal from "../../../components/UI/Modal/Modal";
import Loader from "../../../components/UI/Loader/Loader";
import DefaultInput from "../../../components/UI/DefaultInput/DefaultInput";
import Title from "../../../components/UI/Title/Title";
import DomiantButton from "../../../components/UI/DomiantButton/DomiantButton";
import TextError from "../../../components/UI/TextError/TextError";
import { collectNumbers } from "../../../utils/collectNumbers";
import ItemHoliday from "../../../components/UI/ItemHoliday/ItemHoliday";
import ItemDay from "../../../components/UI/ItemDay/ItemDay";
import AnotherButton from "../../../components/UI/AnotherButton/AnotherButton";
import clsx from "clsx";

interface ICreate {}

interface IForm {
  startDate: string;
  endDate: string;
  hoursPerWeek: string;
  holidays: string[];
  lessonsPerWeek: string;
  table: unknown;
}

interface IDay {
  value: string;
  isActive: boolean;
}

const Create: FC<ICreate> = () => {
  const [file, setFile] = useState<File | null>(null);

  const [days, setDays] = useState<IDay[]>([
    {
      value: "Понедельник",
      isActive: true,
    },
    {
      value: "Вторник",
      isActive: false,
    },
    {
      value: "Среда",
      isActive: false,
    },
    {
      value: "Четверг",
      isActive: false,
    },
    {
      value: "Пятница",
      isActive: false,
    },
    {
      value: "Суббота",
      isActive: false,
    },
    {
      value: "Воскресенье",
      isActive: false,
    },
  ]);

  const [holidaysActive, setHolidaysActive] = useState<boolean>(false);

  const [holidaysValue, setHolidaysValue] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const [form, setForm] = useState<IForm>({
    startDate: "",
    endDate: "",
    hoursPerWeek: "",
    holidays: [],
    lessonsPerWeek: "",
    table: "",
  });

  const submitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    const {
      startDate,
      endDate,
      hoursPerWeek,
      holidays,
      lessonsPerWeek,
      table,
    } = form;

    const isEmpty =
      !startDate ||
      !endDate ||
      !hoursPerWeek ||
      !holidays ||
      !lessonsPerWeek ||
      !table ||
      !file;

    if (isEmpty) {
      setError(true);
      setLoading(false);
      return;
    }

    console.log(form);

    //  Отправка формы на бэк
    setLoading(false);
  };

  const router = useRouter();

  useEffect(() => {
    const auth = checkAuth();

    if (auth) {
      setLoading(false);
      return;
    }

    router.push("/");
    setLoading(false);
  }, []);

  return (
    <div className={classes.wrapper}>
      {loading && (
        <Modal>
          <div className={classes.wrapper_loader}>
            <Loader />
          </div>
        </Modal>
      )}

      <div className={classes.form_wrapper}>
        <div className={classes.wrapper_title}>
          <Title>Создать таблицу</Title>
        </div>
        <form className={classes.form}>
          <DefaultInput
            value={form.hoursPerWeek}
            onChange={(e) => {
              setForm({
                ...form,
                hoursPerWeek: collectNumbers(e.target.value),
              });
            }}
            placeholder="Количество часов (в неделю)"
          />

          <DefaultInput
            value={form.lessonsPerWeek}
            onChange={(e) => {
              setForm({
                ...form,
                lessonsPerWeek: collectNumbers(e.target.value),
              });
            }}
            placeholder="Количество занятий (в неделю)"
          />

          <div className={classes.wrapper_preiod}>
            <DefaultInput
              value={form.startDate}
              onChange={(e) => {
                setForm({ ...form, startDate: e.target.value });
              }}
              type="date"
            />

            <DefaultInput
              value={form.endDate}
              onChange={(e) => {
                setForm({ ...form, endDate: e.target.value });
              }}
              type="date"
            />
          </div>

          {!!form.holidays.length && (
            <div className={classes.wrapper_items_holidays}>
              {form.holidays.map((day) => (
                <ItemHoliday
                  key={day + Math.random()}
                  getItem={(date) => {
                    setForm({
                      ...form,
                      holidays: form.holidays.filter(
                        (d) => d.split("-").reverse().join(".") !== date
                      ),
                    });
                  }}
                >
                  {day.split("-").reverse().join(".")}
                </ItemHoliday>
              ))}
            </div>
          )}

          <DefaultInput
            type={holidaysActive ? "date" : "text"}
            value={holidaysValue}
            onChange={(e) => {
              setHolidaysValue(e.target.value);
            }}
            placeholder="Праздничный день"
            onFocus={() => {
              setHolidaysActive(true);
            }}
            onBlur={() => {
              if (!form.holidays.includes(holidaysValue) && holidaysValue) {
                setForm({
                  ...form,
                  holidays: [...form.holidays, holidaysValue],
                });
                setHolidaysValue("");
              }
              setHolidaysActive(false);
            }}
          />

          {/* Надо поправить */}
          <div className={classes.wrapper_work_days}>
            {days.map((day) => (
              <ItemDay
                setActive={(day) => {
                  const newDays = days.map((p) => {
                    if (p.value === day) {
                      p.isActive = !p.isActive;
                    }

                    return p;
                  });

                  setDays(newDays);
                }}
                key={day.value}
                isActive={day.isActive}
              >
                {day.value}
              </ItemDay>
            ))}
          </div>

          <label
            className={clsx(
              classes.wrapper_input_file,
              !!file && classes.active
            )}
          >
            <span>Загрузить таблицу</span>
            <DefaultInput
              onChange={(e) => {
                setFile(e.target.files && e.target.files[0]);
                console.log(e.target.files && e.target.files[0]);
              }}
              type="file"
            />
          </label>

          <div className={classes.wrapper_subtitle}>
            <span className={classes.subtitle}>Или</span>
          </div>

          <AnotherButton
            onClick={() => {
              router.push("/table/online");
            }}
          >
            Создайте таблицу
          </AnotherButton>

          {error && <TextError>Некорректные дынные</TextError>}

          <div className={classes.wrapper_button}>
            <DomiantButton onClick={submitHandler} type="submit">
              Отправить
            </DomiantButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
