import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")<{ $secondary?: boolean; $small?: boolean; bgcolor?: string }>(
    ({ theme, $secondary, $small, bgcolor }) => ({
      textAlign: "center",
      height: "20px",
      fontSize: $small ? "0.5em" : "0.7em",
      backgroundColor: $secondary
        ? bgcolor || theme.colors.tertiary
        : bgcolor || theme.colors.primary,
      color: "black",
      borderRadius: "20px",
      paddingLeft: $secondary ? "15px" : "20px",
      paddingRight: $secondary ? "15px" : "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "montserrat",
      fontWeight: $secondary ? 700 : 600,
      // opacity: $secondary ? "50%" : "",
      boxShadow: $secondary ? "" : `1.5px 1.5px 0px ${theme.colors.tertiary}`,
    })
  ),
};

export default style;
