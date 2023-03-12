import React, { FC } from "react";

import LogoIcon from "@common/assets/images/logo-typo.svg";
import Clickable from "@common/components/clickable";
import { Divider, Drawer, Grid, Toolbar } from "@mui/material";
import Typos from "@common/components/typography";
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";

import Style from "./style";

export const Navbar: FC = ({}) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Style.AppBar position="fixed">
      <Drawer anchor={"right"} open={open} onClose={() => toggleDrawer()}>
        <Style.DrawerNav>
          <Style.DrawerClose>
            <Clickable onClick={() => toggleDrawer()}>
              <Close />
            </Clickable>
          </Style.DrawerClose>
          <Grid container alignItems="space-between" direction="column" spacing={2}>
            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "inline-block" }}>
                <Clickable newPage address="https://github.com/premier-labs/premier-contracts">
                  <Typos.NormalTitle style={{ fontWeight: 500 }}>Docs</Typos.NormalTitle>
                </Clickable>
              </div>
            </Grid>

            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              <Divider style={{ width: "100px" }} />
            </Grid>

            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "inline-block" }}>
                <Clickable address="/app/drop/0">
                  <Style.OpenApp>Enter app</Style.OpenApp>
                </Clickable>
              </div>
            </Grid>
          </Grid>
        </Style.DrawerNav>
      </Drawer>
      <Toolbar style={{ padding: "0px" }}>
        <Grid container columnSpacing={0} rowSpacing={0} justifyContent="space-between">
          <Grid item flexGrow={1} flexBasis={1} style={{ display: "flex", alignItems: "center" }}>
            <Grid container columnSpacing={0} rowSpacing={0} alignItems="center">
              <Grid item>
                <Clickable address="/">
                  <img alt="" src={LogoIcon} style={{ width: "175px" }} />
                </Clickable>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container justifyContent="end" columnSpacing={2} style={{ height: "100%" }}>
              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable newPage address="https://github.com/premier-labs/premier-contracts">
                  <Typos.NormalTitle style={{ fontWeight: 500 }}>Docs</Typos.NormalTitle>
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
              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable address="/app/drop/0">
                  <Style.OpenApp>Enter app</Style.OpenApp>
                </Clickable>
              </Grid>
              <Grid
                item
                sx={{ display: { xs: "flex", md: "none" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable onClick={() => toggleDrawer()}>
                  <MenuIcon />
                </Clickable>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </Style.AppBar>
  );
};
