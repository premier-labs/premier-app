import { styled } from "@mui/material/styles";

const style = {
  Huge: styled("div")(({ theme }) => ({
    ...theme.myTypography.huge,
  })),
  Big: styled("div")(({ theme }) => ({
    ...theme.myTypography.big,
  })),
  NormalBig: styled("div")(({ theme }) => ({
    ...theme.myTypography.normalBig,
  })),
  NormalBold: styled("div")(({ theme }) => ({
    ...theme.myTypography.normalBold,
  })),
  Normal: styled("div")(({ theme }) => ({
    ...theme.myTypography.normal,
  })),
  NormalTitle: styled("div")(({ theme }) => ({
    ...theme.myTypography.normalTitle,
  })),
};

export default style;
