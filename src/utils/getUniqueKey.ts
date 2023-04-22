import { v4 } from "uuid";

export function getUniqueKey() {
  const key = v4();
  return key;
}
