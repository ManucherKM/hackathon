export function addAuth<T>(user: T): void {
  localStorage.setItem("user", JSON.stringify(user));
}
