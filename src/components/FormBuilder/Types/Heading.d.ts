import { IFieldProps } from "./Common";

export interface IHeadingProps extends IFieldProps {
  subheader?: string;
  size?: "small" | "default" | "large";
}
