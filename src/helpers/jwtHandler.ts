import jwt_decode from "jwt-decode";

export const getIdTokenPayload = (
  idToken: string
): {
  sub: string;
  email_verified: boolean;
  iss: string;
  "cognito:username": string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: string;
  exp: number;
  iat: number;
  given_name: string;
  family_name: string;
  jti: string;
  email: string;
} => {
  return jwt_decode(idToken);
};

export const getAccessTokenPayload = (
  accessToken: string
): {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: string;
  exp: number;
  iat: number;
  jti: string;
  username: string;
} => {
  return jwt_decode(accessToken);
};
