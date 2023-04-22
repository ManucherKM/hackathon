export function getUniqueKey() {
  return (Math.random() + Date.now() + Math.random()).toString;
}
