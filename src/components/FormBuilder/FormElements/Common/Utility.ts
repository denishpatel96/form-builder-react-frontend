import _ from "lodash";
import { FieldProps } from "./Types";

export const handlePropsChange: Function = (
  selectedFieldId: string,
  setFormFields: React.Dispatch<React.SetStateAction<FieldProps[]>>
) => {
  return (path: string, value: string | number | boolean | null) => {
    setFormFields((prev) => {
      if (selectedFieldId === null) return prev;
      const updated = [...prev];
      const index = updated.findIndex((f) => f.id === selectedFieldId);
      _.set(updated[index], path, value);
      return updated;
    });
  };
};

export const serializeForm = (form: HTMLFormElement) => {
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  let i,
    j,
    q = [];
  const elements = form.elements as HTMLCollectionOf<HTMLInputElement | HTMLSelectElement>;
  for (i = elements.length - 1; i >= 0; i = i - 1) {
    if (elements[i].name === "") {
      continue;
    }
    switch (elements[i].nodeName) {
      case "INPUT":
        const inputElement = elements[i] as HTMLInputElement;
        switch (inputElement.type) {
          case "text":
          case "hidden":
          case "password":
          case "button":
          case "reset":
          case "submit":
            q.push(inputElement.name + "=" + encodeURIComponent(inputElement.value));
            break;
          case "checkbox":
          case "radio":
            if (inputElement.checked) {
              q.push(inputElement.name + "=" + encodeURIComponent(inputElement.value));
            }
            break;
        }
        break;
      case "file":
        break;
      case "TEXTAREA":
        q.push(elements[i].name + "=" + encodeURIComponent(elements[i].value));
        break;
      case "SELECT":
        const selectElement = elements[i] as HTMLSelectElement;
        switch (selectElement.type) {
          case "select-one":
            q.push(selectElement.name + "=" + encodeURIComponent(elements[i].value));
            break;
          case "select-multiple":
            for (j = selectElement.options.length - 1; j >= 0; j = j - 1) {
              if (selectElement.options[j].selected) {
                q.push(elements[i].name + "=" + encodeURIComponent(selectElement.options[j].value));
              }
            }
            break;
        }
        break;
      case "BUTTON":
        switch (elements[i].type) {
          case "reset":
          case "submit":
          case "button":
            q.push(elements[i].name + "=" + encodeURIComponent(elements[i].value));
            break;
        }
        break;
    }
  }
  return q.join("&");
};
