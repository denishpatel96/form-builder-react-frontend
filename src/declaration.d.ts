declare module "*.jpg";

export type ErrorResponse = {
  error: {
    name: string;
    message: string;
    stack: string;
  };
  status: number;
};
