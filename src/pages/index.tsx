import classes from "../styles/index.module.scss";
import DefaultInput from "../components/UI/DefaultInput/DefaultInput";
import TextError from "../components/UI/TextError/TextError";
import DomiantButton from "../components/UI/DomiantButton/DomiantButton";
import { MouseEvent, useState, FC, useEffect } from "react";
import Title from "../components/UI/Title/Title";
import Modal from "../components/UI/Modal/Modal";
import Loader from "../components/UI/Loader/Loader";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { addAuth } from "@/utils/addAuth";

interface ILogin {}

interface IForm {
  userName: string;
  password: string;
}

const Login: FC<ILogin> = () => {
  const createUser = useStore((state) => state.createUser);
  const user = useStore((state) => state.user);

  const [loading, setLoading] = useState<boolean>(true);

  const [form, setForm] = useState<IForm>({
    userName: "",
    password: "",
  });

  const [error, setError] = useState<boolean>(false);

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();

    const { userName, password } = form;

    if (!userName || !password) {
      setError(true);
      setLoading(false);
      return;
    }

    const localUser = await createUser(userName, password);

    if (!localUser) {
      console.log("Не удалось получить пользователя");
      setError(true);
      setLoading(false);
      return;
    }

    addAuth(user);

    setLoading(false);
  };

  const router = useRouter();

  useEffect(() => {
    const auth = !!user.token;

    if (!auth) {
      setLoading(false);
      return;
    }

    router.push("/table/tables");

    setLoading(false);
  }, [user]);
  return (
    <div className={classes.login}>
      {loading && (
        <Modal>
          <div className={classes.wrapper_loader}>
            <Loader />
          </div>
        </Modal>
      )}
      <div className={classes.form_wrapper}>
        <div className={classes.wrapper_title}>
          <Title>Авторизация</Title>
        </div>
        <form className={classes.form}>
          <DefaultInput
            value={form.userName}
            onChange={(e) => {
              setForm({ ...form, userName: e.target.value });
            }}
            placeholder="Имя пользователя"
          />
          <DefaultInput
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            type="password"
            placeholder="Пароль"
          />
          {error && <TextError>Неверное имя пользователя или пароль</TextError>}
          <div className={classes.wrapper_button}>
            <DomiantButton onClick={submitHandler} type="submit">
              Войти
            </DomiantButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
