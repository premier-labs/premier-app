import { styled } from "@mui/material/styles";

import { AppBar, Grid, Typography } from "@mui/material";

const style = {
  Root: styled("div")(({ theme }) => ({
    ...theme.myBreakpoints.static,
    backgroundColor: theme.colors.primary,
    paddingTop: theme.header.height,
    minHeight: `calc(100vh - ${theme.header.height})`,
  })),
};

export default style;
