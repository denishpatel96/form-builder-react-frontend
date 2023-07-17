export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.vtwinforms.com"
    : "https://dev-api.vtwinforms.com";
export const WEB_URL =
  process.env.NODE_ENV === "production" ? "https://vtwinforms.com" : "http://localhost:3000";
