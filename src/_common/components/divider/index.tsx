import { FC } from "react";

// styles
import Style from "./style";

import { BoxProps } from "@mui/material";

const Divider: FC<BoxProps & {}> = (props) => {
  return <Style.Root {...props} />;
};

export default Divider;
