import { IForm as IFormTable } from "@/pages/table/create";
import { clearAuth } from "@/utils/clearAuth";
import { create } from "zustand";
import axios from "../axios";

export interface IUser {
  token: string | null;
  tables: any | null;
}

interface ITable {}

interface IState {
  user: IUser;
  table: ITable[];
  setUser: (target: IUser) => void;
  setTable: (table: ITable[]) => void;
  logout: () => void;
  createUser: (userName: string, password: string) => Promise<boolean>;
  createTable: (table: IFormTable) => Promise<boolean>;
}

interface IResultApi {
  token: string;
  tables: string;
}

let defaultStore: IUser = {
  token: null,
  tables: null,
};

let store = defaultStore;

if (typeof localStorage !== "undefined") {
  const local = localStorage.getItem("user");

  if (local) {
    store = JSON.parse(local);
  }
}

export const useStore = create<IState>((set) => ({
  user: store,
  table: [],

  setUser(target: IUser) {
    set(() => ({ user: target }));
  },

  setTable(table: ITable[]) {
    set(() => ({ table: table }));
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

    const target = {
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

    set(() => ({ table: target }));

    return true;
  },

  logout() {
    set(() => ({ user: defaultStore }));
    clearAuth();
  },
}));
