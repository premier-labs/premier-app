import { styled } from "@mui/material/styles";

import { Typography } from "@mui/material";

const style = {
  RootFooter: styled("div")(({ theme }) => ({
    ...theme.myBreakpoints.static,

    paddingTop: "7.5vh",
    paddingBottom: "7.5vh",
    [theme.breakpoints.down("sm")]: {
      ...theme.myBreakpoints.static,
      paddingTop: "5vh",
      paddingBottom: "5vh",
    },
    backgroundColor: theme.colors.secondary,
  })),
  ContentCategory: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.8em",
    fontWeight: 400,
    lineHeight: "2em",
  })),
  ImgIcon2: styled("img")(({ theme }) => ({
    width: "25px",
    height: "25px",
  })),
  Credentials: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.7em",
    fontWeight: 900,
  })),
  ExternalLink: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.8em",
    fontWeight: 500,
  })),
};

export default style;
