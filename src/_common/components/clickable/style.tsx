import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const style = {
  RealRoot: styled("div")<{ $activated?: boolean; $hoverAnimation?: boolean }>(
    ({ theme, $activated, $hoverAnimation }) => ({
      width: "100%",
      transition: "all .2s ease-in-out",
      opacity: $activated ? "" : "10%",
      ":hover": {
        transform: $activated && $hoverAnimation ? "scale(1.02)" : "",
        cursor: $activated ? "pointer" : "not-allowed",
      },
    })
  ),
  RealRootSpan: styled("span")<{ $activated?: boolean; $hoverAnimation?: boolean }>(
    ({ theme, $activated, $hoverAnimation }) => ({
      width: "100%",
      transition: "all .2s ease-in-out",
      opacity: $activated ? "" : "10%",
      ":hover": {
        transform: $activated && $hoverAnimation ? "scale(1.02)" : "",
        cursor: $activated ? "pointer" : "not-allowed",
      },
    })
  ),
  Root: styled("div")(({ theme }) => ({
    width: "100%",
  })),
  RootLink: styled(Link)(({ theme }) => ({
    color: "inherit",
    textDecoration: "none",
    width: "100%",
  })),
  RootHref: styled("a")(({ theme }) => ({
    color: "inherit",
    textDecoration: "none",
    width: "100%",
  })),
};

export default style;
