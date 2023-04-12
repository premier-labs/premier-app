import { FC } from "react";

// styles
import Style from "./style";

import { BoxProps } from "@mui/material";

const Box: FC<BoxProps & {}> = (props) => {
  return <Style.Root {...props}>{props.children}</Style.Root>;
};

export default Box;
