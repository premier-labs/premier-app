import { styled } from "@mui/material/styles";

import { Grid, Typography } from "@mui/material";

const leftDefaultWidth = "20vw";
const rightDefaultWidth = "350px";

const footerHeight = "25px";
const bottomBarHeight = "50px";
const bottomHeight = `calc(${footerHeight} + ${bottomBarHeight})`;
const rightHeightReduced = "320px";

const sizeWidthLeft = "1.5vw";
const sizeWidthRight = "1.5vw";
const bottom = "25px";

const style = {
  Root: styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
  })),
  //
  BottomBar: styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
  })),
  Circle: styled("div")<{ bgcolor: string; $selected?: boolean }>(
    ({ theme, bgcolor, $selected }) => ({
      height: "22.5px",
      width: "22.5px",
      borderRadius: "50%",
      backgroundColor: bgcolor,
      opacity: $selected ? "100%" : "75%",
      border: `2px solid ${$selected ? "black" : theme.colors.tertiary}`,
      transition: "all 0.5s",
    })
  ),
  VersionName: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 500,
    fontSize: "1.1em",
    borderRadius: "5px",
    marginBottom: "10px",
    display: "inline-block",
    float: "right",
  })),
  Mutator: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 600,
    fontSize: "0.8em",
    borderRadius: "5px",
    display: "inline-block",
  })),
  MutatorRemove: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 600,
    fontSize: "0.65em",
    letterSpacing: "1px",
    padding: "4px",
    paddingRight: "7.5px",
    color: "#B9B9FF",
  })),
  ExempleItem: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontWeight: 600,
    fontSize: "9px",
    letterSpacing: "1px",
    borderRadius: "5px",
    padding: "4px",
    paddingLeft: "6px",
    paddingRight: "6px",
    color: "grey",
    backgroundColor: theme.colors.tertiary,
    opacity: "50%",
  })),

  InfoDiv: styled("div")(({ theme }) => ({})),
  InfoDivItemName: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 900,
    fontSize: "0.95em",
    letterSpacing: "1.25px",
    marginBottom: "7.5px",
  })),
  InfoDivDescriptionContainer: styled("div")(({ theme }) => ({
    padding: "5px",
  })),
  InfoDivDescriptionTitle: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.9em",
  })),
  InfoDivDescriptionDescription: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.9em",
  })),
  //
  MoreInfoName: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.6em",
  })),
  MoreInfoSymbol: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 800,
    fontSize: "0.7em",
    marginRight: "5px",
  })),
  Footer: styled("div")(({ theme }) => ({
    position: "absolute",
    height: footerHeight,
    bottom: 0,
    backgroundColor: theme.colors.primary,
    width: "100%",
    display: "flex",
    alignItems: "center",
  })),
  //
  LeftSide: styled("div")(({ theme }) => ({
    zIndex: 1,
    height: "100%",
  })),
  LeftSideRightSide: styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: footerHeight,
    left: `calc(${leftDefaultWidth} + ${sizeWidthLeft} + 10px)`,
    width: leftDefaultWidth,
    zIndex: 1,
  })),
  LeftSideRightSideInner: styled("div")(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    borderRadius: "5px",
    color: "black",
    padding: "7.5px",
    display: "inline-block",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 700,
    fontSize: "0.6em",
    letterSpacing: "0.95px",
    boxShadow: `1.5px 1.5px 0px ${theme.colors.tertiary}`,
  })),
  Explanation: styled("div")(({ theme }) => ({
    height: "20px",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    display: "inline-block",
    marginLeft: "5px",
    color: "#ACACEC",
    fontSize: "0.75em",
  })),
  InnerLeftSide: styled("div")(({ theme }) => ({
    padding: "10px",
  })),
  InnerLeftSideNoNfts: styled("div")(({ theme }) => ({
    paddingTop: "25vh",
    textAlign: "center",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 500,
    fontSize: "0.8em",
  })),
  NoNfts: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 500,
    marginTop: "7.5px",
    fontSize: "0.8em",
    color: "grey",
    marginLeft: "7.5px",
  })),

  HeaderLeftSide: styled(Grid)(({ theme }) => ({
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: theme.colors.primary,
    marginBottom: "5px",
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
      cursor: "pointer",
    })
  ),
  HeaderFirstLeftSideTitle: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "1.5em",
    fontWeight: 500,
    marginBottom: "25px",
  })),
  CommandsContainer: styled(Grid)(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: "10px",
    borderRadius: "5px",
    boxShadow: `1.5px 1.5px 0px ${theme.colors.tertiary}`,
  })),
  CommandsText: styled("div")(({ theme }) => ({
    paddingBottom: "10px",
  })),
  Commands: styled(Grid)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.8em",
    paddingLeft: "5px",
  })),
  CommandItem: styled(Grid)<{ bgcolor: string; $last?: boolean }>(({ theme, bgcolor, $last }) => ({
    backgroundColor: bgcolor,
    padding: "3.5px 10px 3.5px 10px",
    borderRadius: "10px",
    marginRight: $last ? "" : "5px",
    fontWeight: 600,
    fontSize: "0.9em",
    letterSpacing: "0.5px",
  })),
  BodyLeftSide: styled("div")<{ $connected: boolean }>(({ theme, $connected }) => ({
    backgroundColor: theme.colors.primary,
    borderRadius: "5px",
    overflowY: "scroll",
    height: "0",
    minHeight: "100%",
    // height: `calc(100vh - ${theme.header.height} - ${footerHeight} - 125px - ${sizeWidthLeft} - 50px)`,
    opacity: $connected ? 0.5 : 1,
    transition: "all 1s",
    ":hover": {
      opacity: 1,
    },
  })),
  MadeBy: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 700,
    fontSize: "0.65em",
    letterSpacing: "1px",
    padding: "4px",
    paddingRight: "7.5px",
  })),

  BodyLeftSideText: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.8em",
    textAlign: "center",
    padding: "0 30px 0 30px",
    lineHeight: "1.25em",
  })),
  ContainerInfo: styled("div")(({ theme }) => ({
    zIndex: 2,
    borderRadius: "5px",
  })),
  DetailsButton: styled("div")(({ theme }) => ({
    letterSpacing: "2.5px",
  })),
  PayContainerInfoOpen: styled("div")(({ theme }) => ({
    marginTop: "12.5px",
    marginBottom: "12.5px",
  })),
  PayContainerInfoGrid: styled(Grid)(({ theme }) => ({
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: theme.colors.secondary,
  })),

  ModelBox: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    outline: 0,
    padding: "25px",
    borderRadius: "10px ",
    width: "35vw",
    minWidth: "300px",
  })),
  TextModal: styled("div")(({ theme }) => ({
    fontSize: "0.9em",
  })),
  TextModal2: styled("div")(({ theme }) => ({
    fontSize: "0.9em",
    textAlign: "center",
    marginTop: "35px",
  })),
  ModalTitle: styled("div")(({ theme }) => ({
    color: "black",
    textShadow: `${theme.colors.tertiary} 2.5px 2.5px 0.5px`,
    fontFamily: theme.fontFamily.primary,
    fontSize: "2.75em",
    fontWeight: 900,
    marginBottom: "25px",
    paddingBottom: "10px",
    borderBottom: `2.5px solid ${theme.colors.secondary}`,
  })),

  GridPricePortal: styled(Grid)(({ theme }) => ({})),

  Step: styled("div")(({ theme }) => ({
    padding: "12.5px",
    borderRadius: "15px",
    marginRight: "25px",
    marginBottom: "10px",
    lineHeight: "20px",
    backgroundColor: theme.colors.primary,
  })),
  FinalStep: styled("div")(({ theme }) => ({
    fontSize: "0.9em",
    fontFamily: theme.fontFamily.primary,
    padding: "10px",
    fontWeight: 500,
    borderRadius: "15px",
    textAlign: "center",
    backgroundColor: theme.colors.secondary,
    letterSpacing: "-0.25px",
  })),
  FinalStep2: styled("div")<{ $display: boolean }>(({ theme, $display }) => ({
    visibility: $display ? "visible" : "hidden",
    transition: "all 0.5s",
    backgroundColor: "black",
    color: "white",
    fontFamily: theme.fontFamily.primary,
    padding: "7.5px",
    paddingLeft: "25px",
    paddingRight: "25px",
    marginTop: "1.5px",
    marginBottom: "5px",
    fontSize: "0.7em",
    fontWeight: 700,
    borderRadius: "15px",
    // letterSpacing: "0.5px",
  })),
  TitleStepModal: styled("div")(({ theme }) => ({
    fontSize: "0.85em",
    fontWeight: 900,
    display: "inline-block",
  })),
  ModelAlert: styled("div")(({ theme }) => ({
    fontSize: "0.5em",
    color: "red",
  })),

  ContainerTitle: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "2.5em",
    fontWeight: 900,
    marginBottom: "15px",
    display: "inline-block",
  })),

  ContainerPayment: styled("div")(({ theme }) => ({
    display: "inline-block",
    width: "100%",
  })),
  InnerContainerPayment: styled("div")(({ theme }) => ({
    padding: "15px",
    background: "white",
    borderRadius: "5px",
  })),
  MintButton: styled("div")(({ theme }) => ({
    backgroundColor: "black",
    fontFamily: theme.fontFamily.primary,
    textAlign: "center",
    fontWeight: 900,
    fontSize: "0.9em",
    color: "white",
    borderRadius: "15px",
    padding: "10px",
  })),
  InnerContainerInfo2: styled("div")(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: "25px",
  })),
  BottomBarContainer: styled(Grid)(({ theme }) => ({
    height: "100%",
    minWidth: "250px",
    // backgroundColor: theme.backgroundColor.primary,
    opacity: "85%",
    borderRadius: "5px",
    color: "black",
    transition: "all 0.5s",
    ":hover": {
      opacity: "100%",
    },
  })),
  MintInfoText: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.tertiary,
    fontSize: "1.1em",
    letterSpacing: "0.1px",
    lineHeight: "11.5px",
  })),
  //
  MintInfo: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.7em",
    height: "20px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: `1.5px 1.5px 0px ${theme.colors.tertiary}`,
  })),
  MintPriceTitle: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.8em",
    fontWeight: 600,
    opacity: 0.3,
  })),
  MintPrice: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "1.5em",
    fontWeight: 600,
    letterSpacing: "0px",
  })),
  MintPriceUsd: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "0.8em",
    fontWeight: 600,
    opacity: 0.3,
  })),
  DetailsContainer: styled(Grid)(({ theme }) => ({
    backgroundColor: theme.colors.tertiary,
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "5px",
  })),
  //
  //
  //
  //
  StepTitle: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 700,
    letterSpacing: "0.2px",
    fontSize: "0.7em",
    // display: "inline-block",
  })),
  StepTitle3: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 700,
    fontSize: "0.7em",
    display: "inline-block",
    backgroundColor: theme.colors.secondary,
    borderRadius: "5px",
    padding: "1.5px 10px 1.5px 10px",
  })),
  StepTitle2: styled(Typography)(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 700,
    letterSpacing: "0.5px",
    fontSize: "0.9em",
    textAlign: "center",
    display: "block !important",
    padding: "0px 0px 35px 0px",
  })),
  BodyLeftSideTextContainerCenterer: styled("div")(({ theme }) => ({
    position: "absolute",
    top: "42.5%",
    transform: "translate(0, -50%)",
    width: "100%",
  })),
  SearchBar: styled(Grid)(({ theme }) => ({
    padding: "5px",
    backgroundColor: "#F5F5F5",
    borderRadius: "25px",
    fontFamily: theme.fontFamily.primary,
  })),
  CollectionName: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    letterSpacing: "0.5px",
    fontSize: "0.75em",
    display: "inline-block",
    padding: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
    marginBottom: "10px",
    color: "black",
    backgroundColor: theme.colors.secondary,
    borderRadius: "5px",
  })),
  //
  //
  //
  //
  ProjectExplanationImg2: styled("img")<{ active?: boolean }>(({ theme, active }) => ({
    width: "100%",
    transition: "all .2s ease-in-out",
    borderRadius: "5px",
    opacity: active ? "" : "25%",
    boxShadow: `10px 15px 2px ${theme.colors.tertiary}`,
    backgroundColor: "white",
    transform: active ? "scale(1.1)" : "",
  })),
  //
  RootNotFound: styled("div")(({ theme }) => ({
    height: "100vh",
    position: "relative",
    backgroundColor: theme.colors.secondary,
  })),
  NotFound: styled("div")(({ theme }) => ({
    position: "absolute",
    left: "50%",
    top: "45%",
    transform: "translate(-50%, -50%)",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    letterSpacing: "0.5px",
  })),
  MoreLinkContainer: styled("div")(({ theme }) => ({
    marginTop: "35px",
    display: "inline-block",
  })),
  MoreLink: styled("div")(({ theme }) => ({
    fontSize: "0.8em",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 900,
    letterSpacing: "1.5px",
    borderBottom: "2.5px solid black",
    paddingBottom: "5px",
  })),
  BottomLinks: styled(Typography)(({ theme }) => ({
    fontSize: "0.8em",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 500,
    lineHeight: "2em",
    textAlign: "center",
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
