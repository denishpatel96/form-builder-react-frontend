import { merge } from "lodash";
import Card from "./Card";
import Slider from "./Slider";
import Typography from "./Typography";

const ComponentsOverrides = (theme: any) => {
  return merge({ ...Card(theme), ...Slider(theme), ...Typography(theme) });
};

export default ComponentsOverrides;
