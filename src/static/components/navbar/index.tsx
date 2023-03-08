import LogoIcon from "@common/assets/images/logo-typo.svg";
import Clickable from "@common/components/clickable";
import { Grid, Toolbar } from "@mui/material";
import Typos from "@common/components/typography";

import { FC } from "react";

import Style from "./style";

export const Navbar: FC = ({}) => {
  return (
    <Style.AppBar position="fixed">
      <Toolbar style={{ padding: "0px" }}>
        <Grid container columnSpacing={0} rowSpacing={0} justifyContent="space-between">
          <Grid item flexGrow={1} flexBasis={1} style={{ display: "flex", alignItems: "center" }}>
            <Grid container columnSpacing={0} rowSpacing={0} alignItems="center">
              <Grid item>
                <Clickable address="/">
                  <img alt="" src={LogoIcon} style={{ width: "200px" }} />
                </Clickable>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container justifyContent="end" columnSpacing={2}>
              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable address="/docs">
                  <Typos.NormalTitle>Docs</Typos.NormalTitle>
                </Clickable>
              </Grid>
              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <div
                  style={{
                    height: "60%",
                    width: "2.5px",
                    backgroundColor: "black",
                    opacity: "100%",
                  }}
                ></div>
              </Grid>
              <Grid item>
                <Clickable address="/app/drop/0">
                  <Style.OpenApp>Enter app</Style.OpenApp>
                </Clickable>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </Style.AppBar>
  );
};
