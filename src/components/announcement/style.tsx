import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background: "linear-gradient(270deg, #bff5b3, #eddcf5)",
    backgroundSize: "400% 400%",
    "-webkit-animation": "AnimationName 53s ease infinite",
    "-moz-animation": "AnimationName 53s ease infinite",
    animation: "AnimationName 53s ease infinite",
  })),
};

export default style;
