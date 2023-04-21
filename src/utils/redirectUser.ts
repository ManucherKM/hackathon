import { useRouter } from "next/navigation";

export const redirectUser = (page: string) => {
  const router = useRouter();

  router.push(page);
};
