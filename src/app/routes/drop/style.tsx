import { styled } from "@mui/material/styles";

import { Grid, Typography } from "@mui/material";

const footerHeight = "25px";

const sizeWidthLeft = "1.5vw";
const sizeWidthRight = "1.5vw";

const style = {
  Root: styled("div")(({ theme }) => ({
    height: `calc(100vh)`,
    position: "relative",
    backgroundColor: theme.colors.secondary,
  })),
  RootChild: styled(Grid)(({ theme }) => ({
    ...theme.myBreakpoints.app,
    width: "100%",
    height: "100%",
    paddingTop: `calc(${theme.header.height} + 15px)`,
    paddingBottom: `calc(${footerHeight} + 1.5vw)`,
  })),
  BodyScene: styled("div")(({ theme }) => ({
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 1,
  })),
  Footer: styled("div")(({ theme }) => ({
    position: "absolute",
    zIndex: 100,
    height: footerHeight,
    bottom: 0,
    backgroundColor: theme.colors.primary,
    width: "100%",
    display: "flex",
    alignItems: "center",
  })),
  Credentials: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.7em",
    fontWeight: 900,
    paddingLeft: sizeWidthLeft,
    lineHeight: "2em",
  })),
  Version: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.7em",
    fontWeight: 500,
    lineHeight: "2em",
    textAlign: "right",
    paddingRight: sizeWidthRight,
  })),
};

export default style;
