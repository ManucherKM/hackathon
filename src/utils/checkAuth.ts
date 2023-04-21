export function checkAuth(): boolean {
  const auth = localStorage.getItem("auth");

  if (!auth) {
    return false;
  }

  return true;
}
