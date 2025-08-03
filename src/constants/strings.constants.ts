export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.vTwinsForm.com"
    : "https://dev-api.vTwinsForm.com";
export const WEB_URL =
  process.env.NODE_ENV === "production" ? "https://vTwinsForm.com" : "http://localhost:3000";
