import { merge } from "lodash";
import Card from "./Card";
import Slider from "./Slider";

const ComponentsOverrides = (theme: any) => {
  return merge({ ...Card(theme), ...Slider(theme) });
};

export default ComponentsOverrides;
