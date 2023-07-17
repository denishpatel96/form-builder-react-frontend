import jwt_decode from "jwt-decode";
import { CookieStorage } from "./cookieStorage";

export const getPayload = (idToken: string): { sub: string; exp: number } => {
  return jwt_decode(idToken);
};

export const getUserId = (): string | undefined => {
  let userId: string | undefined;
  const idToken = CookieStorage.getItem("idT");
  if (idToken) {
    const { sub } = getPayload(idToken);
    userId = sub;
  }
  return userId;
};
