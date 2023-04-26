import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({
    height: `calc(100vh - ${theme.header.height})`,
    backgroundColor: theme.colors.secondary,
    position: "relative",
  })),
};

export default style;
