import { FORM_ELEMENTS } from "../../../constants";
import { IHeadingProps } from "../Types";

export const getHeadingProps: Function = (elementCount: number): IHeadingProps => {
  return {
    fieldType: FORM_ELEMENTS.HEADING,
    colSpan: 12,
    hidden: false,
    name: `q${elementCount}`,
    subheader: "",
    id: `q${elementCount}`,
    size: "default",
    label: "Form",
  };
};
