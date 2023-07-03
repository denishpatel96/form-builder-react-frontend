import Cookies from "js-cookie";
import { WEB_URL } from "../constants";

const cookieOptions: Cookies.CookieAttributes = {
  expires: 30, // days
  secure: WEB_URL.includes("localhost") ? false : true, // use https
};

const CookieStorage = {
  getItem: (key: string) => {
    return Cookies.get(key);
  },
  getAll: () => {
    return Cookies.get();
  },
  setItem: (key: string, value: string, config: Cookies.CookieAttributes = cookieOptions) => {
    return Cookies.set(key, value, config);
  },
  removeItem: (key: string) => {
    Cookies.remove(key);
  },
  clear: () => {
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((key) => Cookies.remove(key));
  },
};

export { CookieStorage };
