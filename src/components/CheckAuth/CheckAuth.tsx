import { IUser, useStore } from "@/store";
import React from "react";

const CheckAuth = () => {
  const setUser = useStore((state) => state.setUser);

  const auth = localStorage.getItem("auth");

  if (auth) {
    const localUser: IUser = JSON.parse(auth);
    setUser(localUser);
  }
  
  return <div>Пользователь не авторизиван</div>;
};

export default CheckAuth;
