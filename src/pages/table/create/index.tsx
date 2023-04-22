import { FC, useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
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
import { useStore } from "@/store";
import { addAuth } from "@/utils/addAuth";

interface ICreate {}

export interface IForm {
  startDate: string;
  endDate: string;
  hoursPerWeek: string;
  holidays: string[];
  lessonsPerWeek: string;
  table: unknown;
  stage: string;
}

interface IDay {
  value: string;
  isActive: boolean;
}

const initialDays = [
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
];

const Create: FC<ICreate> = () => {
  const user = useStore((state) => state.user);

  const formasd = useStore((state) => state.form);

  const savedForm: IForm | null = useStore((state) => state.form);

  const setSavedForm = useStore((state) => state.setForm);

  const createTable = useStore((state) => state.createTable);

  const [days, setDays] = useState<IDay[]>(initialDays);

  const [file, setFile] = useState<File | null>(null);

  const [holidaysActive, setHolidaysActive] = useState<boolean>(false);

  const [holidaysValue, setHolidaysValue] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const [form, setForm] = useState<IForm>(
    savedForm || {
      startDate: "",
      endDate: "",
      hoursPerWeek: "",
      holidays: [],
      lessonsPerWeek: "",
      table: "",
      stage: "",
    }
  );

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    const {
      startDate,
      endDate,
      hoursPerWeek,
      holidays,
      lessonsPerWeek,
      table,
      stage,
    } = form;

    const isEmpty =
      !startDate ||
      !endDate ||
      !hoursPerWeek ||
      !holidays ||
      !lessonsPerWeek ||
      !table ||
      !stage ||
      !file;

    if (isEmpty) {
      setError(true);
      setLoading(false);
      return;
    }

    const tables = await createTable({
      startDate,
      endDate,
      hoursPerWeek,
      holidays,
      lessonsPerWeek,
      table,
      stage,
    });

    if (!tables) {
      console.log("Не удалось получить таблицу");
      setError(true);
      setLoading(false);
      return;
    }

    addAuth(user);

    setForm({
      startDate: "",
      endDate: "",
      hoursPerWeek: "",
      holidays: [],
      lessonsPerWeek: "",
      table: "",
      stage: "",
    });

    setLoading(false);
  };

  function saveForm() {
    setSavedForm(form);
  }

  const router = useRouter();

  useEffect(() => {
    console.log(user, formasd);

    const auth = !!user.token;

    if (auth) {
      setLoading(false);
      return;
    }


    router.push("/");
    setLoading(false);
  }, [user]);

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
            required
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
            required
            value={form.stage}
            onChange={(e) => {
              setForm({
                ...form,
                stage: e.target.value,
              });
            }}
            placeholder="Курс"
          />

          <DefaultInput
            required
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
              required
              value={form.startDate}
              onChange={(e) => {
                setForm({ ...form, startDate: e.target.value });
              }}
              type="date"
            />

            <DefaultInput
              required
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
            required
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
              required
              onChange={(e) => {
                setFile(e.target.files && e.target.files[0]);
              }}
              accept=""
              type="file"
            />
          </label>

          <div className={classes.wrapper_subtitle}>
            <span className={classes.subtitle}>Или</span>
          </div>

          <AnotherButton
            onClick={() => {
              router.push("/table/online");
              saveForm();
            }}
            type="button"
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
