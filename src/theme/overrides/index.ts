import { merge } from "lodash";
import Card from "./Card";
import Drawer from "./Drawer";
import Slider from "./Slider";
import Tooltip from "./Tooltip";
import Typography from "./Typography";

const ComponentsOverrides = (theme: any) => {
  return merge({
    ...Drawer(theme),
    ...Tooltip(theme),
    ...Card(theme),
    ...Slider(theme),
    ...Typography(theme),
  });
};

export default ComponentsOverrides;
