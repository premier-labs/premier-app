import { FC } from "react";

// styles
import Style from "./style";

import { GridProps } from "@mui/material";

const CenterItem: FC<GridProps & { $full?: boolean }> = (props) => {
  return (
    <Style.Root
      style={{ width: props.$full ? "100%" : "", height: props.$full ? "100%" : "" }}
      {...props}
    >
      {props.children}
    </Style.Root>
  );
};

export default CenterItem;
