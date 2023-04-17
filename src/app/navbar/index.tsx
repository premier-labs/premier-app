import React, { FC, useRef } from "react";

import { Grid, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Clickable from "@common/components/clickable";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "../store/hooks";
import { shortenAddress } from "../utils";
import Style from "./style";
import { useTheme } from "@mui/material/styles";

import CenterItem from "@common/components/grid/centerItem";
import { DripStatus } from "@premier-types";
import { IconEtherscan, IconOpenSea, PremierLogo, PremierMiniLogo } from "@common/assets/images";
import Box from "@common/components/box";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useDrips from "@app/hooks/useDrips";
import { CONFIG } from "@common/config";

export const NavbarComponent: FC = () => {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();

  const {
    dripsData: drips,
    isDripsLoading: isLoading,
    isDripsDone,
    isDripsError,
  } = useDrips(address as string, { skip: !isConnected });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const f = useRef();

  const theme = useTheme();

  return (
    <Style.Root>
      <Style.PointOpenWallet ref={f as any} />
      <Style.AppBar position="absolute">
        <Toolbar style={{ padding: "0px" }}>
          <Grid container columnSpacing={0} rowSpacing={0} justifyContent="space-between">
            <Grid item style={{ display: "flex", alignItems: "center" }}>
              <Grid container columnSpacing={0} rowSpacing={0} alignItems="center">
                <Grid item>
                  <Clickable address="/">
                    <Box style={{ width: "150px" }} sx={{ display: { xs: "none", md: "block" } }}>
                      <PremierLogo style={{ width: "100%" }} />
                    </Box>
                    <Box style={{ width: "42.5px" }} sx={{ display: { xs: "block", md: "none" } }}>
                      <PremierMiniLogo style={{ width: "100%" }} />
                    </Box>
                  </Clickable>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ display: "flex", alignItems: "center" }}>
              <Grid
                container
                columnSpacing={0}
                rowSpacing={0}
                flexDirection="row-reverse"
                alignItems="center"
              >
                <Grid item>
                  <Box>
                    <Clickable activated={isConnected} onClick={handlePopoverOpen}>
                      <div
                        style={{
                          marginLeft: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "10px",
                        }}
                      >
                        <AccountBalanceWalletIcon
                          style={{ color: theme.colors.black, width: "40px", height: "40px" }}
                        />
                      </div>
                    </Clickable>
                  </Box>

                  <Popover
                    open={open}
                    anchorEl={f.current}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    disableRestoreFocus
                    elevation={10}
                  >
                    <ClickAwayListener onClickAway={handlePopoverClose}>
                      <Style.WalletView>
                        {drips && drips.length ? (
                          <Grid container>
                            {drips.map((drip, index) => (
                              <Grid item key={index} xs={12}>
                                <Grid container>
                                  <Grid item xs={2}>
                                    <img
                                      src={drip.img || drip.nft?.img || "/placeholder.png"}
                                      style={{ width: "100%" }}
                                      alt=""
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={10}
                                    style={{ padding: "1.5px", paddingLeft: "10px" }}
                                  >
                                    <Grid
                                      container
                                      direction="column"
                                      justifyContent="space-between"
                                      style={{ height: "100%", padding: "2.5px" }}
                                    >
                                      <Grid item>
                                        <Grid container justifyContent="space-between">
                                          <Grid item>
                                            <Grid container columnSpacing={1}>
                                              <CenterItem item>
                                                <Style.WalletTypoCollectionDrop
                                                  style={{
                                                    borderBottom: `5px solid black`,
                                                    // borderImage: `linear-gradient(to right, ${
                                                    //   drip.drop.metadata.versions[drip.version]
                                                    //     .color
                                                    // } 50%, transparent 50%) 100% 1`,
                                                  }}
                                                >
                                                  {drip.drop.symbol}
                                                </Style.WalletTypoCollectionDrop>
                                              </CenterItem>
                                              <Grid item>
                                                <Style.WalletTypoDripId>
                                                  #{drip.id}
                                                </Style.WalletTypoDripId>
                                              </Grid>
                                            </Grid>
                                          </Grid>

                                          <Grid item>
                                            <Grid container columnSpacing={0.5}>
                                              {/* <CenterItem
                                                item
                                                style={{ display: "flex", alignContent: "center" }}
                                              >
                                                <Clickable address="">
                                                  <IconOpenSea
                                                    style={{ width: "15px", height: "15px" }}
                                                  />
                                                </Clickable>
                                              </CenterItem> */}
                                              <CenterItem
                                                item
                                                style={{ display: "flex", alignContent: "center" }}
                                              >
                                                <Clickable
                                                  address={`${CONFIG.blockExplorerUrl}/address/${drip.drop.address}`}
                                                >
                                                  <IconEtherscan
                                                    style={{ width: "15px", height: "15px" }}
                                                  />
                                                </Clickable>
                                              </CenterItem>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item>
                                        <Grid container justifyContent="space-between">
                                          <CenterItem item>
                                            <Grid container>
                                              <Grid item>
                                                <Clickable
                                                  hoverAnimation={false}
                                                  address={`/app/drop/${drip.drop.id}/${drip.id}`}
                                                  onClick2={() => handlePopoverClose()}
                                                >
                                                  <Style.WalletTypoDripAction>
                                                    View
                                                  </Style.WalletTypoDripAction>
                                                </Clickable>
                                              </Grid>
                                            </Grid>
                                          </CenterItem>
                                          {drip.status === DripStatus.MUTATED ? (
                                            <Grid item>
                                              <Style.WalletTypoDripNft>
                                                {drip.nft?.symbol} #{drip.nft?.id}
                                              </Style.WalletTypoDripNft>
                                            </Grid>
                                          ) : (
                                            <Grid item>
                                              <Style.WalletTypoCollection>
                                                MUTABLE
                                              </Style.WalletTypoCollection>
                                            </Grid>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <div
                                  style={{
                                    height: "2px",
                                    marginTop: "2.5px",
                                    marginBottom: "5px",
                                    backgroundColor: "grey",
                                    opacity: "0.1",
                                  }}
                                ></div>
                              </Grid>
                            ))}
                          </Grid>
                        ) : (
                          <Grid
                            style={{ height: "100px" }}
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            {isLoading ? (
                              <Style.WalletTypo1>Loading ...</Style.WalletTypo1>
                            ) : (
                              <Style.WalletTypo1>You do not own any drips :'(</Style.WalletTypo1>
                            )}
                          </Grid>
                        )}
                      </Style.WalletView>
                    </ClickAwayListener>
                  </Popover>
                </Grid>

                <Grid item>
                  <ConnectButton chainStatus={{ smallScreen: "none", largeScreen: "full" }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Style.AppBar>
    </Style.Root>
  );
};

export default NavbarComponent;
