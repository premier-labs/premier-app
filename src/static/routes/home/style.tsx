import { styled } from "@mui/material/styles";

import { Grid, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";

const style = {
  Root: styled("div")(({ theme }) => ({
    ...theme.myBreakpoints.static,
    position: "relative",
    backgroundColor: theme.colors.secondary,
    width: "100%",
    boxSizing: "border-box",
  })),
  Accordion: styled(Accordion)(({ theme }) => ({
    boxShadow: "none",
    backgroundColor: "transparent",
    "&:before": {
      display: "none",
    },
    "&:after": {
      display: "none",
    },
  })),
  HomeScreenContainer: styled("div")(({ theme }) => ({
    paddingTop: theme.header.height,
    paddingBottom: "25px",
    boxSizing: "border-box",
  })),
  HomeScreen: styled("div")(({ theme }) => ({})),
  GridWholeHeight: styled(Grid)(({ theme }) => ({
    borderRadius: "5px",
    backgroundColor: theme.colors.primary,
    boxSizing: "border-box",
    height: `calc(100vh - ${theme.header.height} - 25px)`,
    padding: "25px",
  })),
  Grid0: styled(Grid)(({ theme }) => ({
    marginTop: "25px",
    borderRadius: "5px",
    backgroundColor: theme.colors.primary,
    boxSizing: "border-box",
    padding: "25px",
  })),
  ButtonDiscover: styled(Grid)(({ theme }) => ({
    ...theme.button.normal,
    borderRadius: "10px",
  })),
  ScreenContainer: styled("div")(({ theme }) => ({
    width: `100%`,
    boxSizing: "border-box",
    paddingBottom: "25px",
  })),
  Screen: styled("div")(({ theme }) => ({
    height: `100%`,
    width: `100%`,
    borderRadius: "5px",
    padding: "25px",
    boxSizing: "border-box",
    backgroundColor: theme.colors.primary,
  })),
  test: styled("div")(({ theme }) => ({
    ...theme.myBreakpoints.antiStatic,
    paddingTop: "5vh",
    paddingBottom: "5vh",
  })),
  test2: styled("div")(({ theme }) => ({
    ...theme.myBreakpoints.static,
  })),
  Title: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 800,
    fontSize: "12vw",
    lineHeight: "0.9em",
  })),
  Title2: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 900,
    fontSize: "7.5em",
  })),
  SubTitle: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 800,
    paddingTop: "25px",
    fontSize: "3em",
    lineHeight: "0.9em",
  })),
  SubTitle2: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 800,
    fontSize: "3.25em",
    lineHeight: "1em",
  })),
  SubTitle3: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 800,
    fontSize: "8.5em",
    lineHeight: "0.9em",
  })),
  SubTitle4: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 800,
    fontSize: "1em",
  })),
  SubTitle5: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 800,
    fontSize: "1.1em",
    lineHeight: "0.9em",
  })),
  SubTitle6: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 800,
    // color: "white",
    backgroundColor: theme.colors.secondary,
    fontSize: "0.95em",
    // display: "inline-block",
    float: "right",
    // textAlign: "right",
    padding: "5px",
    borderRadius: "5px",
  })),
  SubTitleText: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 500,
    paddingLeft: "15px",
    paddingRight: "50px",
    // lineHeight: "0.9em",
    fontSize: "1.1em",
    // backgroundColor: "red",
  })),
  ContainerExempleDrip: styled("div")(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: "15px",
    borderRadius: "25px",
  })),
  ContainerExempleDripContainer: styled("div")(({ theme }) => ({
    borderRadius: "5px",
  })),
  Price: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 700,
    fontSize: "1em",
    letterSpacing: "-0.25px",
  })),
  GoToApp: styled("div")(({ theme }) => ({
    borderRadius: "5px",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.7em",
    padding: "5px",
  })),
  ContainerContract: styled("div")(({ theme }) => ({
    borderRadius: "5px",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.8em",
    lineHeight: "1em",
  })),
  GalleryWrap: styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: "2.5px",
  })),
  GalleryWrap2: styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    gap: "1.5px",
  })),
  GalleryItem: styled("div")<{ color: string; $onHover: boolean }>(
    ({ theme, color, $onHover }) => ({
      position: "relative",
      flex: $onHover ? 7 : 1,
      backgroundPosition: "30% 10%",
      imageRendering: "pixelated",
      WebkitPrintColorAdjust: "exact",
      width: "100%",
      backgroundImage: `url(${color})`,
      transition: "flex 0.8s ease",
      objectFit: "none",
      objectPosition: "30% 10%",
      cursor: $onHover ? "pointer" : "auto",
    })
  ),
  InfoDivItemName: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 900,
    fontSize: "0.9em",
    letterSpacing: "1.25px",
    marginBottom: "7.5px",
  })),

  ContainerInfoDiv: styled("div")(({ theme }) => ({
    padding: "10px",
    backgroundColor: theme.colors.secondary,
    borderRadius: "5px",
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
    textAlign: "right",
    fontSize: "0.7em",
    fontWeight: 900,
  })),
  ExternalLink: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    textAlign: "right",
    fontSize: "0.8em",
    fontWeight: 500,
  })),
};

export default style;
