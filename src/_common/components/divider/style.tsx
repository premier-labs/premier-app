import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const style = {
  Root: styled(Box)(({ theme }) => ({
    height: "1px",
    marginTop: "10vh",
    marginBottom: "10vh",
    backgroundColor: "rgba(0,0,0,0.12)",
  })),
};

export default style;
