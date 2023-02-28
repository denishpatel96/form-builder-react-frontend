import { merge } from "lodash";
import Card from "./Card";

const ComponentsOverrides = (theme: any) => {
  return merge(Card(theme));
};

export default ComponentsOverrides;
