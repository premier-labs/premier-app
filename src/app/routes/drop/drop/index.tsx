import React, { FC, useEffect, useState } from "react";

import { sceneRefType } from "@common/3d/scenes/skate_1";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Grid, ImageList, ImageListItem, Modal } from "@mui/material";
import { Drip, Drop, NFT, NFTs, NFTsByCollection } from "@premier-types";
import { ethers } from "ethers";
import Typos from "@common/components/typography";

import { useCState } from "@common/3d/utils/hooks";
import CenterItem from "@common/components/grid/centerItem";
import Box from "@common/components/box";
import { useImagePreloader } from "@common/hooks/imagePreloader";
import { IconEth, IconEtherscan, IconOpenSea, IconTrash } from "@common/assets/images";
import Clickable from "@common/components/clickable";
import Pastille from "@common/components/pastille";
import Tooltip from "@common/components/tooltip";
import { useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "@app/store/hooks";
import { useGetAssetsQuery } from "@app/store/services";
import Style from "./style";
import { useParams } from "react-router-dom";
import { useSceneStore } from "../../../../_common/3d/hooks/hook";
import { CONFIG } from "@common/config";

import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useAccount } from "wagmi";
import { useMint } from "@app/hooks/useMint";
import { useMutate } from "@app/hooks/useMutate";

const { parseEther: toEth, formatEther, formatBytes32String } = ethers.utils;
const { AddressZero } = ethers.constants;

const DropComponent: FC<{ drop: Drop; sceneRef: sceneRefType }> = ({ drop, sceneRef }) => {
  const { address, isConnected } = useAccount();

  const dispatch = useDispatch();
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const { mint, mintReset, isMintLoading, isMintDone, isMintError, mintData } = useMint();
  const { mutate, mutateReset, isMutateLoading, isMutateDone, isMutateError, mutateData } =
    useMutate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  // fetch data
  const { data: assets, isLoading } = useGetAssetsQuery(
    { address: address as string },
    { skip: true } // TODO
  );

  const placeholderItem: NFT = {
    address: AddressZero,
    img: "/placeholder.png",
    id: 0,
    name: "",
    symbol: "",
  };

  // fc state
  const [currentItem, , setItem] = useCState<NFT>(placeholderItem);
  const [currentVersion, , setVersion] = useCState(0);

  const isPlaceholderItem = currentItem.address === placeholderItem.address;
  const isMintable = drop.currentSupply !== drop.maxSupply;

  const { isLoaded } = useSceneStore();

  useEffect(() => {
    if (isLoaded) {
      updateItem(placeholderItem);
      updateVersion(0);
    }
  }, [isLoaded]);

  const updateVersion = (version: number) => {
    if (!sceneRef.current) return;
    setVersion(version);
    sceneRef.current.updateVersion(
      0,
      version,
      drop.symbol,
      currentItem.name + " #" + currentItem.id
    );
  };

  const updateItem = (newItem: NFT) => {
    if (!sceneRef.current) return;
    setItem(newItem);
    sceneRef.current.updateItem(
      newItem.img,
      0,
      currentVersion,
      drop.symbol,
      newItem.name + " #" + newItem.id
    );
  };

  const resetItem = () => {
    const resetToItem = placeholderItem;

    setItem(resetToItem);
    sceneRef.current.updateItem(
      resetToItem.img,
      0,
      currentVersion,
      drop.symbol,
      resetToItem.name + " #" + resetToItem.id
    );
  };

  const [hover, setHover] = useState(0);
  const { imagesPreloaded } = useImagePreloader(drop.metadata.versions.map((item) => item.texture));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    mintReset();
  };

  // Drip
  const isDripMinted = isMintDone && mintData?.tokenId !== undefined;

  // Mutation
  const isMutated = isMutateDone;

  const modalActions = [
    {
      isDisplay: true,
      isMyTurn: !isDripMinted && !isMutated,
      stepName: "MINT",
      text: (
        <Style.TextModal>
          Let's mint your <b>Drip</b>.
        </Style.TextModal>
      ),
      isLoading: isMintLoading,
      isDone: isDripMinted,
      tx: mintData?.hash,
      price: formatEther(drop.price),
      action: {
        name: "MINT",
        fct: () => mint(drop.address, currentVersion, drop.price, currentItem),
      },
    },

    ...(!isPlaceholderItem
      ? [
          {
            isDisplay: isDripMinted,
            isMyTurn: isDripMinted && !isMutated,
            stepName: "MUTATE",
            text: (
              <Style.TextModal>
                Last step, mutating your <b>Drip</b> with your{" "}
                <b>
                  {currentItem.symbol}#{currentItem.id}
                </b>{" "}
                !
              </Style.TextModal>
            ),
            isLoading: isMutateLoading,
            isDone: isMutateDone,
            tx: mutateData?.hash,
            price: "0.0",
            action: {
              name: "MUTATE",
              fct: () =>
                mutate(
                  drop.address,
                  mintData?.tokenId as number,
                  currentItem.address,
                  currentItem.id
                ),
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            style: {
              background: "rgba(0,0,0,0.7)",
            },
          },
        }}
      >
        <Style.ModelBox>
          <Grid container rowSpacing={0} flexWrap="wrap">
            <Grid item xs={12}>
              <Grid container>
                <Grid item flexGrow={1}>
                  <Style.ModalTitle>DROP #{drop.id}</Style.ModalTitle>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {modalActions.map((step, index) => (
                <Style.Step
                  key={index}
                  style={{
                    marginBottom: "10px",
                    opacity: step.isDisplay ? 1 : 0.5,
                  }}
                  sx={{
                    marginRight: {
                      xs: "0px",
                      md: "25px",
                    },
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    style={{ marginBottom: "15px", opacity: step.isDisplay ? 1 : 0.1 }}
                  >
                    <CenterItem item>
                      <Style.TitleStepModal>{step.stepName}</Style.TitleStepModal>
                    </CenterItem>
                    <CenterItem item style={{ minHeight: "20px" }}>
                      {step.isLoading && <span className="loaderMini2" />}
                      {step.isDone && (
                        <CheckCircleOutlineIcon
                          style={{ color: "#1EC500", width: "17.5px", height: "17.5px" }}
                        />
                      )}
                    </CenterItem>
                  </Grid>
                  <Grid
                    container
                    style={{
                      opacity: step.isDisplay ? 1 : 0.1,
                    }}
                  >
                    <Grid item xs={10}>
                      {step.text}
                    </Grid>
                    <Grid item flexGrow={1} />
                    <Grid
                      item
                      style={{ visibility: step.isLoading || step.isDone ? "visible" : "hidden" }}
                    >
                      <Grid container columnSpacing={0.5}>
                        <CenterItem item>
                          <Clickable
                            onClick={() => navigator.clipboard.writeText(step.tx as string)}
                          >
                            <ContentCopyIcon style={{ width: "14.5px", height: "14.5px" }} />
                          </Clickable>
                        </CenterItem>
                        <CenterItem item>
                          <Clickable address={`${CONFIG.blockExplorerUrl}/tx/${step.tx}`}>
                            <IconEtherscan style={{ width: "16.5px", height: "16.5px" }} />
                          </Clickable>
                        </CenterItem>
                      </Grid>
                    </Grid>
                  </Grid>
                </Style.Step>
              ))}
            </Grid>

            {!modalActions[modalActions.length - 1].isDone && (
              <Style.GridPricePortal item style={{ marginRight: "10px" }}>
                <Grid container alignContent="space-around" style={{ height: "100%" }}>
                  {modalActions.map(
                    (item, index) =>
                      item.isMyTurn && (
                        <React.Fragment key={index}>
                          <Grid item xs={12}>
                            <Style.MintPriceTitle>Price</Style.MintPriceTitle>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container columnSpacing={1}>
                              <Grid item>
                                <IconEth style={{ width: "12.5px", height: "25px" }} />
                              </Grid>
                              <Grid item>
                                <Style.MintPrice>{item.price}</Style.MintPrice>
                              </Grid>
                              {/* <Grid item>
                            <Style.MintPriceUsd>($0)</Style.MintPriceUsd>
                          </Grid> */}
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )
                  )}
                  {modalActions[modalActions.length - 1].isDone && <>Thanks</>}
                </Grid>
              </Style.GridPricePortal>
            )}

            <Grid
              item
              flexGrow={1}
              style={{
                display: "flex",
                flex: 1,
                alignItems: "end",
                transition: "all .5s ease-in-out",
              }}
              sx={{
                marginRight: {
                  xs: "0px",
                  md: "25px",
                },
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Grid container direction="row-reverse">
                    <Grid item>
                      <Clickable address={`/app/drop/${drop.id}/${mintData?.tokenId}`}>
                        <Style.FinalStep2 $display={modalActions[modalActions.length - 1].isDone}>
                          View
                        </Style.FinalStep2>
                      </Clickable>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  {modalActions.map(
                    (item, index) =>
                      item.isMyTurn && (
                        <Clickable key={index} onClick={item.action.fct}>
                          <Style.MintButton>{item.action.name}</Style.MintButton>
                        </Clickable>
                      )
                  )}

                  {modalActions[modalActions.length - 1].isDone && (
                    <Style.FinalStep>All done ! Thanks for your support 🎉</Style.FinalStep>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Style.ModelBox>
      </Modal>

      <Box sx={{ display: { xs: "none", md: "block" } }} style={{ height: "100%" }}>
        <Style.Root container justifyContent="space-between" columns={50}>
          <Grid item xs={0} sm={15} xl={12} style={{ zIndex: 10, height: "100%" }}>
            <Style.LeftSide>
              <Grid container direction="column" style={{ height: "100%" }}>
                <Grid item>
                  <Style.HeaderLeftSide container alignItems="center">
                    <Grid item flexGrow={1}>
                      <Style.StepTitle>SELECT YOUR NFT</Style.StepTitle>
                    </Grid>
                  </Style.HeaderLeftSide>
                </Grid>

                <Grid item flexGrow={1}>
                  <Style.BodyLeftSide $connected={isConnected}>
                    <Style.InnerLeftSide>
                      {assets && assets.length ? (
                        assets.map((collection, index1) => (
                          <div key={index1} style={{ marginBottom: "20px" }}>
                            <Style.CollectionName>{collection.collectionName}</Style.CollectionName>
                            <ImageList cols={4} gap={4}>
                              {collection.assets.map((item, index) => (
                                <ImageListItem
                                  key={index}
                                  style={{
                                    border:
                                      currentItem &&
                                      currentItem.name === collection.collectionName &&
                                      currentItem.id === item.id
                                        ? "3px solid #2AFE00"
                                        : "3px solid white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    updateItem(item);
                                  }}
                                >
                                  <img src={item.img} alt={"item.id"} loading="lazy" />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          </div>
                        ))
                      ) : isConnected ? (
                        <Style.InnerLeftSideNoNfts>
                          {isLoading ? "Loading ..." : "You do not own any NFTs :("}
                        </Style.InnerLeftSideNoNfts>
                      ) : (
                        <Style.InnerLeftSideNoNfts>
                          You are not connected :'(
                        </Style.InnerLeftSideNoNfts>
                      )}
                    </Style.InnerLeftSide>
                  </Style.BodyLeftSide>
                </Grid>
              </Grid>
            </Style.LeftSide>
          </Grid>

          <Grid item xs={0} sm={15} xl={9} style={{ zIndex: 10 }}>
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
            >
              <Grid item>
                <Style.InfoDiv>
                  <Grid container>
                    <Grid item xs={12}>
                      <Style.InfoDivItemName>PLACEHOLDER</Style.InfoDivItemName>
                    </Grid>
                    <Grid item sm={10} xl={12}>
                      {imagesPreloaded && (
                        <img
                          style={{
                            width: "100%",
                            borderRadius: "15px",
                          }}
                          src={currentItem?.img}
                          alt=""
                        />
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Grid
                        container
                        alignItems="center"
                        style={{
                          marginTop: "5px",
                          height: "20px",
                        }}
                      >
                        <Grid item>
                          <Style.MoreInfoSymbol>
                            {currentItem.symbol} #{currentItem.id}
                          </Style.MoreInfoSymbol>
                        </Grid>

                        <Grid item>
                          {isPlaceholderItem ? (
                            <Style.ExempleItem>PLACEHOLDER</Style.ExempleItem>
                          ) : null}
                        </Grid>

                        <Grid item flexGrow={1}>
                          <Grid container direction="row-reverse">
                            {!isPlaceholderItem ? (
                              <Grid item>
                                <Style.MutatorRemove>
                                  <Clickable onClick={() => resetItem()}>
                                    BACK TO PLACEHOLDER
                                  </Clickable>
                                </Style.MutatorRemove>
                              </Grid>
                            ) : null}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: "5px" }}>
                      <Grid container spacing={0.5}>
                        <Grid item>
                          <Clickable
                            activated={!isPlaceholderItem}
                            address={`${CONFIG.openseaUrl}/${currentItem.address}/${currentItem.id}`}
                          >
                            <IconOpenSea style={{ width: "16.5px", height: "16.5px" }} />
                          </Clickable>
                        </Grid>
                        <Grid item>
                          <Clickable
                            activated={!isPlaceholderItem}
                            address={`${CONFIG.blockExplorerUrl}/address/${currentItem.address}`}
                          >
                            <IconEtherscan style={{ width: "16.5px", height: "16.5px" }} />
                          </Clickable>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{
                      marginTop: "15px",
                      paddingTop: "15px",
                      borderTop: "1.5px solid lightgrey",
                    }}
                  >
                    <Style.InfoDivItemName>DECK</Style.InfoDivItemName>
                  </Grid>

                  <Grid item>
                    <Style.BottomBar>
                      <Style.BottomBarContainer
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={12}>
                          <Style.GalleryWrap>
                            {drop.metadata.versions.map((item, index) => (
                              <Style.GalleryItem
                                key={index}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(currentVersion)}
                                onClick={() => updateVersion(index)}
                                $onHover={hover === index}
                                color={item.texture}
                                style={{
                                  height: "50px",
                                  borderRadius: "5px",
                                }}
                              />
                            ))}
                          </Style.GalleryWrap>
                        </Grid>
                      </Style.BottomBarContainer>
                    </Style.BottomBar>
                  </Grid>
                </Style.InfoDiv>
              </Grid>

              <Grid item>
                <div
                  style={{
                    marginTop: "15px",
                    paddingTop: "15px",
                    borderTop: "1.5px solid lightgrey",
                  }}
                />
                <Style.ContainerInfo>
                  <Style.ContainerTitle>DROP #{drop.id}</Style.ContainerTitle>
                  <Style.VersionName
                    style={{
                      backgroundColor: drop.metadata.versions[currentVersion].color,
                      color: theme.colors.black,
                      padding: "5px",
                    }}
                  >
                    {drop.metadata.versions[currentVersion].name}
                  </Style.VersionName>

                  <Style.ContainerPayment>
                    <Style.InnerContainerPayment>
                      <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                          <Grid container justifyContent="space-between">
                            <Grid item>
                              <Style.MintPriceTitle>Price</Style.MintPriceTitle>
                            </Grid>
                            <Grid item>
                              <Style.MintPriceTitle>
                                {drop.currentSupply} / {drop.maxSupply} Minted
                              </Style.MintPriceTitle>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container alignItems="baseline" columnSpacing={1}>
                            <Grid item>
                              <IconEth style={{ width: "12.5px", height: "20px" }} />
                            </Grid>
                            <Grid item>
                              <Style.MintPrice>{formatEther(drop.price)}</Style.MintPrice>
                            </Grid>
                            {/* <Grid item>
                            <Style.MintPriceUsd>($0)</Style.MintPriceUsd>
                          </Grid> */}
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Clickable
                            activated={isMintable && isConnected}
                            onClick={() => {
                              setOpen(true);
                            }}
                          >
                            <Style.MintButton>
                              {isMintable ? "MINT" : "OUT OF STOCK"}
                            </Style.MintButton>
                          </Clickable>
                        </Grid>
                      </Grid>
                    </Style.InnerContainerPayment>
                  </Style.ContainerPayment>
                </Style.ContainerInfo>
              </Grid>
            </Grid>
          </Grid>
        </Style.Root>
      </Box>

      <Box sx={{ display: { xs: "display", md: "none" } }}>
        <Root>
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: `calc(90% - ${drawerBleeding}px)`,
                overflow: "visible",
              },
            }}
          />
          <SwipeableDrawer
            anchor="bottom"
            open={openDrawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            allowSwipeInChildren={true}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <StyledBox
              sx={{
                backgroundColor: theme.colors.primary,
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                visibility: "visible",
                right: 0,
                left: 0,
                display: { sm: "block", md: "none" },
              }}
            >
              <Puller />

              <Grid
                container
                style={{
                  height: `${drawerBleeding}px`,
                  boxSizing: "border-box",
                  paddingTop: "20px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
                justifyContent="space-between"
              >
                <Grid item flexGrow={1}>
                  <Grid container justifyContent="space-between">
                    {currentItem.address === AddressZero ? (
                      <Grid item>
                        <Typos.Normal style={{ paddingTop: "1px" }}>
                          <Style.StepTitle>SELECT YOUR NFT</Style.StepTitle>
                        </Typos.Normal>
                      </Grid>
                    ) : (
                      <Grid item>
                        <Style.MoreInfoSymbol
                          style={{
                            backgroundColor: theme.colors.light,
                            color: theme.colors.black,
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          DROP #{drop.id}
                        </Style.MoreInfoSymbol>
                      </Grid>
                    )}
                    <Grid item>
                      <Grid container alignItems="center" spacing={0.5}>
                        {currentItem.address === AddressZero && (
                          <Grid item>
                            <Style.MoreInfoSymbol
                              style={{
                                backgroundColor: theme.colors.light,
                                color: theme.colors.black,
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                            >
                              DROP #{drop.id}
                            </Style.MoreInfoSymbol>
                          </Grid>
                        )}
                        <Grid item>
                          <Style.MoreInfoSymbol
                            style={{
                              backgroundColor: drop.metadata.versions[currentVersion].color,
                              color: theme.colors.black,
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {drop.metadata.versions[currentVersion].name}
                          </Style.MoreInfoSymbol>
                        </Grid>
                        <Grid
                          item
                          style={{
                            display: currentItem.address === AddressZero ? "none" : "block",
                          }}
                        >
                          <Style.MoreInfoSymbol
                            style={{
                              backgroundColor: theme.colors.secondary,
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {currentItem.symbol} #{currentItem.id}
                          </Style.MoreInfoSymbol>
                        </Grid>
                        <Grid
                          item
                          style={{
                            display: currentItem.address === AddressZero ? "none" : "block",
                          }}
                        >
                          <Clickable onClick={() => resetItem()}>
                            <IconTrash style={{ width: "16.5px", height: "16.5px" }} />
                          </Clickable>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Clickable
                    activated={isMintable && isConnected}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <Style.MintButton>
                      {isMintable ? (
                        <>
                          MINT{" "}
                          <span
                            style={{
                              fontFamily: theme.fontFamily.primary,
                              fontSize: "0.75em",
                              fontWeight: 600,
                              opacity: 0.75,
                            }}
                          >
                            ({drop.currentSupply} / {drop.maxSupply} Minted)
                          </span>
                        </>
                      ) : (
                        "OUT OF STOCK"
                      )}
                    </Style.MintButton>
                  </Clickable>
                </Grid>
              </Grid>
            </StyledBox>

            <Box height={"calc(78%)"} overflow="scroll">
              <Style.InnerLeftSide>
                {assets && assets.length ? (
                  assets.map((collection, index1) => (
                    <div key={index1} style={{ marginBottom: "20px" }}>
                      <Style.CollectionName>{collection.collectionName}</Style.CollectionName>
                      <ImageList cols={4} gap={4}>
                        {collection.assets.map((item, index) => (
                          <ImageListItem
                            key={index}
                            style={{
                              border:
                                currentItem &&
                                currentItem.name === collection.collectionName &&
                                currentItem.id === item.id
                                  ? "3px solid #2AFE00"
                                  : "3px solid white",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              updateItem(item);
                            }}
                          >
                            <img src={item.img} alt={"item.id"} loading="lazy" />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </div>
                  ))
                ) : isConnected ? (
                  <Style.InnerLeftSideNoNfts>
                    {isLoading ? "Loading ..." : "You do not own any NFTs :("}
                  </Style.InnerLeftSideNoNfts>
                ) : (
                  <Style.InnerLeftSideNoNfts>You are not connected :'(</Style.InnerLeftSideNoNfts>
                )}
              </Style.InnerLeftSide>
            </Box>

            <Box
              height={"calc(22%)"}
              style={{
                paddingTop: "15px",
                paddingBottom: "10px",
                paddingLeft: "15px",
                paddingRight: "15px",
                boxSizing: "border-box",
                backgroundColor: theme.colors.primary,
                borderTopRightRadius: "25px",
                borderTopLeftRadius: "25px",
              }}
            >
              <Typos.Normal style={{ height: "22.5%", paddingBottom: "10px" }}>
                <Style.StepTitle>SELECT VERSION</Style.StepTitle>
              </Typos.Normal>

              <Style.BottomBar style={{ height: "calc(77.5% - 10px - 5px)" }}>
                <Style.BottomBarContainer container justifyContent="center" alignItems="center">
                  <Grid item xs={12} style={{ height: "100%" }}>
                    <Style.GalleryWrap style={{ height: "100%" }}>
                      {drop.metadata.versions.map((item, index) => (
                        <Style.GalleryItem
                          key={index}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(currentVersion)}
                          onClick={() => updateVersion(index)}
                          $onHover={hover === index}
                          color={item.texture}
                          style={{
                            height: "100%",
                            borderRadius: "5px",
                          }}
                        />
                      ))}
                    </Style.GalleryWrap>
                  </Grid>
                </Style.BottomBarContainer>
              </Style.BottomBar>
            </Box>
          </SwipeableDrawer>
        </Root>
      </Box>
    </>
  );
};

const drawerBleeding = 100;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default DropComponent;
