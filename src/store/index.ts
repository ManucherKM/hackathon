import { clearAuth } from "@/utils/clearAuth";
import { create } from "zustand";
import axios from "../axios";
import { IForm as IFormTable } from "../pages/table/create";
import { IChunk } from "@/pages/table/online";

export interface IUser {
  token: string | null;
  tables: IChunk[][] | File | null;
}

interface IState {
  user: IUser;
  form: IFormTable | null;
  setForm: (target: IFormTable) => void;
  setUser: (target: IUser) => void;
  setTable: (table: IChunk[][]) => void;
  logout: () => void;
  createUser: (userName: string, password: string) => Promise<boolean>;
  createTable: (target: FormData) => Promise<boolean>;
}

interface IResultApi {
  token: string;
  tables: IChunk[];
}

const defaultStore = {
  token: null,
  tables: null,
};

let user = defaultStore;

if (typeof localStorage !== "undefined") {
  const local = localStorage.getItem("user");

  if (local) {
    user = JSON.parse(local);
  }
}

export const useStore = create<IState>((set) => ({
  user: user,
  form: {
    startDate: "",
    endDate: "",
    hoursPerWeek: "",
    holidays: [],
    workDays: [],
    lessonsPerWeek: "",
    hoursPerWeekmax: "",
    table: "",
    stage: "",
  },

  setUser(target: IUser) {
    set(() => ({ user: target }));
  },

  setForm(target: IFormTable) {
    set(() => ({ form: target }));
  },

  setTable(target: IChunk[][]) {
    console.log(target);

    set(({ user }) => ({
      user: {
        ...user,
        tables: target,
      },
    }));
  },

  async createUser(userName, password) {
    const params = {
      login: userName,
      password,
    };

    const { data } = await axios.post<string>("/login", params);

    if (!data) {
      console.log("Не удалось получить пользователя");
      return false;
    }

    const target: IUser = {
      tables: [],
      token: data,
    };

    set(() => ({ user: target }));

    return true;
  },

  async createTable(t: FormData) {
    const { data } = await axios.post("/setxlsx", t);

    if (!data) {
      console.log("Не удалось отправить форму с таблицей");
      return false;
    }

    return true;
  },

  logout() {
    set(() => ({ user: defaultStore }));

    clearAuth();
  },
}));
