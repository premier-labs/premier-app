import { FC } from "react";

import { Tooltip as MaterialTootip, TooltipProps } from "@mui/material";

// styles
import Style from "./style";

type props = { title: any; placement?: TooltipProps["placement"] };

const Tooltip: FC<props> = ({ children, title, placement = "top" }) => {
  return (
    <Style.Root>
      <MaterialTootip arrow title={title} placement={placement}>
        <div>{children}</div>
      </MaterialTootip>
    </Style.Root>
  );
};

export default Tooltip;
