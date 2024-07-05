export const requestToken = (req: Request) => {
  if (!req.headers || !req.headers.get("authorization")) {
    return false;
  }
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  return true;
};
