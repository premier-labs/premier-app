import Typography from "@app/_common/components/typography";
import { Grid, useTheme } from "@mui/material";
import { FC } from "react";
import Style from "./style";

const ErrorComponent: FC<{ text: string }> = ({ text }) => {
  const theme = useTheme();

  return (
    <Style.Root>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Grid container direction="column" spacing={1.25}>
              <Grid item>
                <Typography.Big style={{ fontFamily: theme.fontFamily.wide }}>404</Typography.Big>
              </Grid>
              <Grid item>
                <Typography.NormalBig>Ooops!</Typography.NormalBig>
              </Grid>
              <Grid item>
                <Typography.NormalBig>Page Not Found</Typography.NormalBig>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography.Normal style={{ color: theme.colors.black, opacity: "65%" }}>
                  {text}
                </Typography.Normal>
              </Grid>
              {/* <Grid item>
                <Typography.Normal style={{ color: theme.colors.black, opacity: "65%" }}>
                  We suggest you go back to home.
                </Typography.Normal>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Style.Root>
  );
};

export default ErrorComponent;
