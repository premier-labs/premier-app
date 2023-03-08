import { styled } from "@mui/material/styles";

import { AppBar, Grid, Typography } from "@mui/material";

const style = {
  // Navbar
  AppBar: styled(AppBar)(({ theme }) => ({
    ...theme.myBreakpoints.static,
    height: theme.header.height,
    backgroundColor: theme.colors.primary,
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    color: "black",
  })),
  OpenApp: styled("div")(({ theme }) => ({
    ...theme.button.normal,
  })),
  //
  Root: styled("div")(({ theme }) => ({
    ...theme.myBreakpoints.static,
  })),
  HomeScreenContainer: styled("div")(({ theme }) => ({
    paddingTop: theme.header.height,
    paddingBottom: "25px",
    height: `100vh`,
    width: `100%`,
    boxSizing: "border-box",
  })),
  HomeScreen: styled("div")(({ theme }) => ({
    height: `100%`,
    width: `100%`,
    borderRadius: "5px",
    padding: "25px",
    boxSizing: "border-box",
    backgroundColor: theme.colors.primary,
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
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: `2.5px 2.5px 2.5px ${theme.colors.secondary}, -.1px -.1px 1.5px ${theme.colors.secondary}`,
  })),
  ContainerExempleDripContainer: styled("div")(({ theme }) => ({
    backgroundColor: "white",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "5px",
  })),
  GoToApp: styled("div")(({ theme }) => ({
    borderRadius: "5px",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.7em",
    padding: "5px",
  })),
  ContainerContract: styled("div")(({ theme }) => ({
    // backgroundColor: theme.backgroundColor.primary,
    // padding: "10px",
    borderRadius: "5px",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.7em",
  })),
  GalleryWrap: styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    gap: "1.5px",
  })),
  GalleryItem: styled("div")<{ color: string; $onHover: boolean }>(
    ({ theme, color, $onHover }) => ({
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
    fontSize: "0.8em",
    letterSpacing: "1.25px",
    marginBottom: "7.5px",
  })),
  ContainerInfoDiv: styled("div")(({ theme }) => ({
    padding: "10px",
    backgroundColor: theme.colors.primary,
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
