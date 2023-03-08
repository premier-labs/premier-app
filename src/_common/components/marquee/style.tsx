import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({
    paddingTop: ".75vh",
    paddingBottom: ".75vh",
    height: "100%",
    width: "100%",
  })),
  Sentence: styled("div")<{ fontSize?: string }>(({ theme, fontSize = "17.5px" }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: fontSize,
    color: "black",
    fontWeight: 900,
    paddingRight: "35px",
    textAlign: "center",
    transform: "skew(-20deg)",
    whiteSpace: "nowrap",
  })),
};

export default style;
