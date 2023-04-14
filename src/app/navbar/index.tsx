import React, { FC, useRef } from "react";

import { Grid, Toolbar } from "@mui/material";

import Clickable from "@common/components/clickable";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "../store/hooks";
import { useGetDripsQuery } from "../store/services";
import { login } from "../store/services/web3";
import { shortenAddress } from "../utils";
import Style from "./style";
import { useTheme } from "@mui/material/styles";

import CenterItem from "@common/components/grid/centerItem";
import { DripStatus } from "@premier-types";
import { IconEtherscan, IconOpenSea, PremierLogo } from "@common/assets/images";
import Box from "@common/components/box";

export const NavbarComponent: FC = () => {
  const { auth, authError, address, name } = useSelector((state) => state.web3);
  const dispatch = useDispatch();

  const { data: drips, isLoading } = useGetDripsQuery({ address }, { skip: !auth });

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
          <Grid container columnSpacing={0} rowSpacing={0}>
            <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
              <Grid container columnSpacing={0} rowSpacing={0} alignItems="center">
                <Grid item>
                  <Clickable address="/">
                    <Box sx={{ width: { xs: "125px", md: "150px" } }}>
                      <PremierLogo style={{ width: "100%" }} />
                    </Box>
                  </Clickable>
                </Grid>
              </Grid>
            </Grid>
            <Grid item flexGrow={1} />
            <Grid item style={{ display: "flex", alignItems: "center" }}>
              <Grid
                container
                columnSpacing={2}
                rowSpacing={0}
                flexDirection="row-reverse"
                alignItems="center"
              >
                <Grid item>
                  <Clickable activated={auth} onClick={handlePopoverOpen}>
                    <AccountBalanceWalletIcon
                      style={{
                        fontSize: "40px",
                        color: theme.colors.black,
                      }}
                    />
                  </Clickable>
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
                                                    borderImage: `linear-gradient(to right, ${
                                                      drip.drop.metadata.versions[drip.version]
                                                        .color
                                                    } 50%, transparent 50%) 100% 1`,
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
                                              <CenterItem
                                                item
                                                style={{ display: "flex", alignContent: "center" }}
                                              >
                                                <IconOpenSea
                                                  style={{ width: "15px", height: "15px" }}
                                                />
                                              </CenterItem>
                                              <CenterItem
                                                item
                                                style={{ display: "flex", alignContent: "center" }}
                                              >
                                                <IconEtherscan
                                                  style={{ width: "15px", height: "15px" }}
                                                />
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
                  {auth ? (
                    <Style.Wallet container>
                      <Grid
                        item
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/5032"
                          alt=""
                          style={{ width: "32.5px", height: "32.5px", borderRadius: "1500px" }}
                        />
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          style={{ height: "100%" }}
                        >
                          <Grid item>
                            <Style.WalletENS>{name}</Style.WalletENS>
                          </Grid>
                          <Grid item>
                            <Style.WalletAddy>{shortenAddress(address)}</Style.WalletAddy>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Style.Wallet>
                  ) : (
                    <Clickable onClick={() => dispatch(login())}>
                      <Style.GoToAppButton>Connect Wallet</Style.GoToAppButton>
                    </Clickable>
                  )}
                </Grid>
                <Grid item>
                  <Style.NetworkSupported>
                    {!auth && authError && (
                      <>
                        Network unsupported. Please switch to: <b>[Goerli]</b>
                      </>
                    )}
                  </Style.NetworkSupported>
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
