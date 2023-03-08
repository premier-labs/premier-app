import { styled } from "@mui/material/styles";
import { Grid, GridProps } from "@mui/material";

const style = {
  Root: styled(Grid)<GridProps>(({ theme, justifyContent = "center", alignItems = "center" }) => ({
    display: "flex",
    alignItems: alignItems as string,
    justifyContent: justifyContent as string,
  })),
};

export default style;
