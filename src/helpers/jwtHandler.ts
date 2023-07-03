import jwt_decode from "jwt-decode";

export const getPayload = (idToken: string): { sub: string; exp: number } => {
  return jwt_decode(idToken);
};
