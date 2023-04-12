import React, { FC } from "react";

import LogoIcon from "@common/assets/images/logo-typo.svg";
import Clickable from "@common/components/clickable";
import { Divider, Drawer, Grid, Toolbar } from "@mui/material";
import Typos from "@common/components/typography";
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import { useTheme } from "@common/theme";

import { IconBook, IconDao, PremierLogo } from "@common/assets/images";

import Style from "./style";
import { DOCS_URL } from "@common/constants";

export const Navbar: FC = ({}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Style.AppBar position="relative">
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
                <Clickable newPage address={DOCS_URL}>
                  <Typos.NavbarLink>Docs</Typos.NavbarLink>
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
                  <PremierLogo style={{ width: "175px" }} />
                </Clickable>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container justifyContent="end" columnSpacing={1.25} style={{ height: "100%" }}>
              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable
                  newPage
                  address="https://github.com/premier-labs/premier-contracts"
                  hoverAnimation={false}
                  activated={false}
                >
                  <Typos.NavbarLink>
                    <IconDao style={{ width: "15px", paddingRight: "7.5px" }} />
                    DAO
                  </Typos.NavbarLink>
                </Clickable>
              </Grid>

              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable
                  newPage
                  address="https://github.com/premier-labs/premier-contracts"
                  hoverAnimation={false}
                >
                  <Typos.NavbarLink>
                    <IconBook style={{ width: "15px", paddingRight: "7.5px" }} />
                    Docs
                  </Typos.NavbarLink>
                </Clickable>
              </Grid>

              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <div
                  style={{
                    height: "25px",
                    width: "2px",
                    backgroundColor: theme.colors.tertiary,
                    opacity: "100%",
                  }}
                ></div>
              </Grid>
              <Grid
                item
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable newPage address="/app/drop/0" hoverAnimation={false}>
                  <Typos.NavbarLink style={{ backgroundColor: "white" }}>
                    Enter App
                  </Typos.NavbarLink>
                </Clickable>
              </Grid>
              <Grid
                item
                sx={{ display: { xs: "flex", md: "none" } }}
                style={{ alignItems: "center" }}
              >
                <Clickable onClick={() => toggleDrawer()}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                      border: `1px solid ${theme.colors.tertiary}`,
                      padding: "5px",
                    }}
                  >
                    <MenuIcon
                      style={{ color: theme.colors.tertiary, width: "25px", height: "25px" }}
                    />
                  </div>
                </Clickable>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </Style.AppBar>
  );
};
