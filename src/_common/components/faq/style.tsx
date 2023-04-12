import { styled } from "@mui/material/styles";
import { Box, Accordion } from "@mui/material";

const style = {
  Root: styled(Box)(({ theme }) => ({})),
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
};

export default style;
