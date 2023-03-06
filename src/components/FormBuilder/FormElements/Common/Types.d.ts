import { IRadioProps } from "../Radio/Radio";
import { ITextProps } from "../TextField/Text";

//string | number | number[] | boolean | null
export interface IFieldPropertiesChangeFunc {
  (path: string, value: any): void;
}

export type FieldProps = ITextProps | IRadioProps;
