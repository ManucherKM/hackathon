import { clearAuth } from "@/utils/clearAuth";
import { create } from "zustand";
import axios from "../axios";
import { IForm as IFormTable } from "../pages/table/create";
interface ITable {}

export interface IUser {
  token: string | null;
  tables: ITable[] | null;
}

interface IState {
  user: IUser;
  setUser: (target: IUser) => void;
  setTable: (table: ITable[]) => void;
  logout: () => void;
  createUser: (userName: string, password: string) => Promise<boolean>;
  createTable: (table: IFormTable) => Promise<boolean>;
}

interface IResultApi {
  token: string;
  tables: ITable[];
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

  setUser(target: IUser) {
    set(() => ({ user: target }));
  },

  setTable(target: ITable[]) {
    set(({ user }) => ({
      user: {
        ...user,
        tables: target,
      },
    }));
  },

  async createUser(userName, password) {
    const params = {
      userName,
      password,
    };

    const { data } = await axios.post<IResultApi>("/user", params);

    if (!data) {
      console.log("Не удалось получить пользователя");
      return false;
    }

    const { tables, token } = data;

    const target: IUser = {
      tables,
      token,
    };

    set(() => ({ user: target }));

    return true;
  },

  async createTable(table: IFormTable) {
    const params = {
      ...table,
    };

    const { data } = await axios.post("/table", params);

    if (!data) {
      console.log("Не удалось отправить форму с таблицей");
      return false;
    }

    const { ...args } = data;

    const target = {
      ...args,
    };

    set(({ user }) => ({
      user: {
        ...user,
        tables: target,
      },
    }));

    return true;
  },

  logout() {
    set(() => ({ user: defaultStore }));

    clearAuth();
  },
}));
