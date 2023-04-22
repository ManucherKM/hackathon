import { useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./Online.module.scss";
import { useStore } from "@/store";

const tables = () => {
  const user = useStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    const auth = !!user.token;

    if (auth) return;

    router.push("/");
  }, [user]);
  return <div className={classes.wrapper}></div>;
};

export default tables;
