import { FORM_ELEMENTS } from "../../../constants";
import { IRadioProps } from "../Types";

export const getRadioProps: Function = (elementCount: number): IRadioProps => {
  return {
    fieldType: FORM_ELEMENTS.RADIO,
    colSpan: 12,
    hidden: false,
    id: `q${elementCount}`,
    title: "",
    name: `q${elementCount}`,
    error: false,
    helperText: "",
    row: true,
    defaultValue: "",
    label: `Radio group label`,
    required: false,
    useCalcValues: false,
    size: "medium", // 'medium','small'
    options: ["option 1", "option 2", "option 3", "option 4"].map((o) => ({
      value: "",
      label: o,
    })),
  };
};
