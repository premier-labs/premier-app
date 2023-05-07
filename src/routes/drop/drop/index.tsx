import Faq from "@app/_common/components/faq";
import { placeholderItem } from "@app/_common/utils";
import ModalActionComponent from "@app/components/modalAction";
import useDrop from "@app/hooks/useDrop";
import NotFound from "@app/components/error";
import SceneLoader, { sceneRefType } from "@common/3d/scenes/skate_1";
import { IconEtherscan, IconMouse, IconOpenSea } from "@common/assets/images";
import Box from "@common/components/box";
import Clickable from "@common/components/clickable";
import Typos from "@common/components/typography";
import { CONFIG, blockExplorerUrl, openseaUrl } from "@common/config";
import { useImagePreloader } from "@common/hooks/imagePreloader";
import { ClickAwayListener } from "@mui/base";
import Portal from "@mui/base/Portal";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Grid, ImageList, ImageListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Drop, NFT } from "@premier-types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { animated, useSpring } from "@react-spring/web";
import { ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMint } from "src/hooks/useMint";
import { useMutate } from "src/hooks/useMutate";
import { useAccount } from "wagmi";
import Style from "./style";
import ErrorComponent from "@app/components/error";
import useNfts from "@app/hooks/useNfts";
import { useSceneStore } from "@app/_common/3d/hooks/hook";

const { formatEther } = ethers.utils;

const DropComponent: FC<{ drop: Drop; sceneRef: sceneRefType }> = ({ drop, sceneRef }) => {
  // Preloading
  const {} = useImagePreloader(drop.metadata.versions.map((item) => item.texture));

  // Theming
  const theme = useTheme();

  // Web3 hooks
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { mint, mintReset, isMintLoading, isMintDone, isMintError, mintData } = useMint();
  const { mutate, mutateReset, isMutateLoading, isMutateDone, isMutateError, mutateData } =
    useMutate();

  // Server hooks

  // Assets
  const { nfts, isNftsLoading, isNftsError } = useNfts(address, {
    enabled: isConnected,
  });

  // Client hooks

  // Select versions drawer
  const [showSelectVersionDrawer, setShowSelectVersionDrawer] = React.useState(false);
  const toggleSelectNFTDrawer = () => {
    setShowSelectVersionDrawer(!showSelectVersionDrawer);
  };
  const handleClickAwaySelectNFTDrawer = () => {
    if (showSelectVersionDrawer) {
      setShowSelectVersionDrawer(false);
    }
  };

  // Select NFT page
  const [showSelectNFT, setShowSelectNFT] = useState(false);

  // More Info
  const [showMoreInfo, setShowMoreInfo] = useState(true);

  // 3D
  const [selectedNFT, setSelectedNFT] = useState<NFT>(placeholderItem);
  const [selectedDripVersion, setSelectedVersion] = useState(0);

  const updateVersion = (version: number) => {
    if (!sceneRef.current) return;
    setSelectedVersion(version);
    sceneRef.current.updateVersion(version);
  };

  const updateItem = (newItem: NFT) => {
    if (!sceneRef.current) return;
    setSelectedNFT(newItem);
    sceneRef.current.updateItem(newItem.img);
  };

  const resetItem = () => {
    if (!sceneRef.current) return;
    setSelectedNFT(placeholderItem);
    sceneRef.current.updateItem(placeholderItem.img);
  };

  // Utils
  const isSelectedNFTPlaceholder = selectedNFT.address === placeholderItem.address;
  const isDropMintable = drop.currentSupply !== drop.maxSupply;

  // Actions
  const [showActionModal, setShowActionModal] = React.useState(false);
  const hideActionModal = () => {
    setShowActionModal(false);
    mintReset();
  };

  // Actions data

  const isDripMinted = isMintDone;
  const isDripMutated = isMutateDone;

  const modalActions = [
    {
      isDisplay: true,
      isMyTurn: !isDripMinted && !isDripMutated,
      stepName: "MINT",
      text: (
        <Style.TextModal>
          Let's mint your <b>Drip</b>.
        </Style.TextModal>
      ),
      isLoading: isMintLoading,
      isDone: isDripMinted,
      tx: mintData?.hash,
      price: formatEther(drop.price).toString(),
      action: {
        name: "MINT",
        fct: () => mint(drop.id, selectedDripVersion, drop.price),
      },
    },

    ...(!isSelectedNFTPlaceholder
      ? [
          {
            isDisplay: isDripMinted,
            isMyTurn: isDripMinted && !isDripMutated,
            stepName: "MUTATE",
            text: (
              <Style.TextModal>
                Last step, mutating your <b>Drip</b> with your{" "}
                <b>
                  {selectedNFT.symbol}#{selectedNFT.id}
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
                mutate(drop.id, mintData?.dripId as number, selectedNFT.address, selectedNFT.id),
            },
          },
        ]
      : []),
  ];

  // Buttons

  const mintButton = (() => {
    if (!isConnected) {
      return { txt: "CONNECT YOUR WALLET", action: () => openConnectModal?.(), activated: true };
    } else if (!isDropMintable) {
      return { txt: "OUT OF STOCK", action: () => {}, activated: false };
    }

    return { txt: "MINT", action: () => setShowActionModal(true), activated: true };
  })();

  const mintMutateButton = (() => {
    if (!isConnected) {
      return { txt: "CONNECT YOUR WALLET", action: () => openConnectModal?.(), activated: true };
    } else if (!isDropMintable) {
      return { txt: "OUT OF STOCK", action: () => {}, activated: false };
    } else if (isSelectedNFTPlaceholder) {
      return { txt: "SELECT YOUR NFT", action: () => {}, activated: false };
    }

    return { txt: "MINT & MUTATE", action: () => setShowActionModal(true), activated: true };
  })();

  // Scroll events
  const [lastScrollTop, setLastScrollTop] = React.useState(0);

  const handleScroll = (e: any) => {
    var st = e.currentTarget.scrollTop;
    if (st > lastScrollTop) {
      setShowSelectVersionDrawer(false);
    }
    setLastScrollTop(st);

    if (st >= 0 && st <= 50) {
      setShowMoreInfo(true);
    } else {
      setShowMoreInfo(false);
    }
  };

  // Animations

  const springPropsSelectVersionDrawer = useSpring({
    position: "fixed",
    boxShadow: "5px 5px 5px #bebebe, -1px -1px 10px lightgrey",
    width: "50%",
    left: "50%",
    bottom: !showSelectVersionDrawer ? -500 : 0,
    backgroundColor: theme.colors.light,
    padding: "10px",
    zIndex: 100,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const springPropsMoreInfo = useSpring({
    opacity: showMoreInfo ? "100%" : "0%",
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // Page life cycle

  const { isLoaded } = useSceneStore();

  useEffect(() => {
    setShowSelectNFT(false);

    if (!isLoaded || !sceneRef.current) return;

    resetItem();
    updateVersion(0);
  }, [isLoaded]);

  return (
    <>
      <ModalActionComponent
        drop={drop}
        showModal={showActionModal}
        onClose={() => hideActionModal()}
        modalActions={modalActions}
        dripId={mintData?.dripId}
      />

      <Box>
        <Grid container style={{ height: `calc(100vh - ${theme.header.height})` }}>
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: theme.colors.secondary,
              height: "100%",
              position: "relative",
            }}
          >
            {/* 3D Scene */}
            <div
              style={{
                position: "absolute",
                zIndex: 10000,
                bottom: 10,
                left: "1.5%",
                transform: "translate(0%, -40%)",
              }}
            >
              <Typos.Normal style={{ fontSize: "0.7em", textAlign: "center" }}>
                <b>Designed</b> in Montferrier Sur Lez, France.
              </Typos.Normal>
            </div>
          </Grid>

          <Grid
            item
            xs={6}
            onScroll={handleScroll}
            style={{
              backgroundColor: theme.colors.primary,
              overflow: "scroll",
              height: `calc(100vh - ${theme.header.height})`,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              style={{
                padding: "1rem",
                height: `calc(100vh - ${theme.header.height})`,
              }}
            >
              {!showSelectNFT && <Grid item />}

              <Grid item>
                <Grid container spacing={1.25}>
                  <Grid item xs={12}>
                    {drop && (
                      <Grid container spacing={1}>
                        <Grid item>
                          <Grid container spacing={0.5}>
                            <Grid item>
                              <Clickable address={blockExplorerUrl + `/address/${drop.address}`}>
                                <IconEtherscan style={{ width: "15px", height: "15px" }} />
                              </Clickable>
                            </Grid>
                            <Grid item>
                              <Clickable address={openseaUrl + `/${drop.address}`}>
                                <IconOpenSea style={{ width: "15px", height: "15px" }} />
                              </Clickable>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={12} style={{ marginBottom: "10px" }}>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typos.NormalTitle>
                          DROP{" "}
                          <span style={{ fontWeight: 500, fontFamily: theme.fontFamily.primary }}>
                            / {drop.id}
                          </span>
                        </Typos.NormalTitle>
                      </Grid>

                      <Grid item>
                        <Typos.Normal style={{ fontWeight: 300, fontSize: "1.25em" }}>
                          {formatEther(drop.price).toString()} ETH
                        </Typos.Normal>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={1} style={{ marginBottom: "10px" }}>
                      <Grid item xs={12}>
                        <Style.MintPriceTitle>
                          {drop.currentSupply} / {drop.maxSupply} Minted
                        </Style.MintPriceTitle>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item>
                        <ClickAwayListener onClickAway={handleClickAwaySelectNFTDrawer}>
                          <div>
                            <Clickable onClick={toggleSelectNFTDrawer}>
                              <Style.VersionButton>
                                <div
                                  style={{
                                    height: "22.5px",
                                    width: "22.5px",
                                    borderRadius: "25px",
                                    border: `1px solid ${theme.colors.secondary}`,
                                    backgroundColor:
                                      drop.metadata.versions[selectedDripVersion].color,
                                  }}
                                />
                                <Typos.Normal style={{ fontSize: "0.75em" }}>
                                  {drop.metadata.versions[selectedDripVersion].name} (
                                  {drop.metadata.versions.length})
                                </Typos.Normal>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <KeyboardArrowDownIcon style={{ fontSize: "1.1em" }} />
                                </div>
                              </Style.VersionButton>
                            </Clickable>

                            <Portal>
                              <animated.div style={springPropsSelectVersionDrawer as any}>
                                <swiper-container
                                  slides-per-view={3.75}
                                  space-between={10}
                                  style={{ height: "100%" }}
                                >
                                  {drop.metadata.versions.map((item) => (
                                    <swiper-slide key={item.id} style={{ height: "100%" }}>
                                      <Clickable
                                        hoverAnimation={false}
                                        onClick={() => updateVersion(item.id)}
                                      >
                                        <div
                                          style={{
                                            height: "25vh",
                                            backgroundColor: item.color,
                                            border: `1.5px solid ${
                                              selectedDripVersion === item.id
                                                ? theme.colors.black
                                                : "transparent"
                                            }`,
                                          }}
                                        />
                                        <div style={{ height: "1.7rem" }}>
                                          <Typos.Normal
                                            style={{
                                              fontSize: "0.75em",
                                              fontWeight: 400,
                                              marginTop: "0.3rem",
                                            }}
                                          >
                                            {item.name}
                                          </Typos.Normal>
                                        </div>
                                      </Clickable>
                                    </swiper-slide>
                                  ))}
                                </swiper-container>
                              </animated.div>
                            </Portal>
                          </div>
                        </ClickAwayListener>
                      </Grid>

                      {showSelectNFT && (
                        <Grid item style={{ width: "100%", paddingTop: "25px" }}>
                          <Grid
                            container
                            spacing={1}
                            justifyContent="space-between"
                            style={{ height: "100%" }}
                          >
                            <Grid item xs={6} style={{ height: "100%" }}>
                              <Style.HeaderLeftSide>
                                <Style.StepTitle>SELECT YOUR NFT</Style.StepTitle>
                              </Style.HeaderLeftSide>

                              <Style.BodyLeftSide $connected={isConnected}>
                                <Style.InnerLeftSide>
                                  {isConnected && nfts && nfts.length ? (
                                    nfts.map((collection, index1) => (
                                      <div key={index1} style={{ marginBottom: "20px" }}>
                                        <Style.CollectionName>
                                          {collection.collectionName}
                                        </Style.CollectionName>
                                        <ImageList cols={5} gap={4}>
                                          {collection.assets.map((item, index) => (
                                            <ImageListItem
                                              key={index}
                                              style={{
                                                border:
                                                  selectedNFT &&
                                                  selectedNFT.name === collection.collectionName &&
                                                  selectedNFT.id === item.id
                                                    ? `1.5px solid ${theme.colors.black}`
                                                    : "1.5px solid transparent",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                updateItem(item);
                                              }}
                                            >
                                              <img
                                                src={item.img}
                                                crossOrigin="anonymous"
                                                alt={"item.id"}
                                                loading="lazy"
                                              />
                                            </ImageListItem>
                                          ))}
                                        </ImageList>
                                      </div>
                                    ))
                                  ) : isConnected ? (
                                    <Style.InnerLeftSideNoNfts>
                                      {isNftsLoading ? "Loading ..." : "You do not own any NFTs :("}
                                    </Style.InnerLeftSideNoNfts>
                                  ) : (
                                    <Style.InnerLeftSideNoNfts>
                                      You are not connected :'(
                                    </Style.InnerLeftSideNoNfts>
                                  )}
                                </Style.InnerLeftSide>
                              </Style.BodyLeftSide>
                            </Grid>

                            <Grid item xs={4}>
                              <Grid container direction="column" spacing={5}>
                                <Grid item>
                                  <Grid container direction="column">
                                    <Grid item>
                                      <Style.HeaderLeftSide>
                                        <Style.StepTitle>NFT SELECTED</Style.StepTitle>
                                      </Style.HeaderLeftSide>
                                    </Grid>

                                    <Grid item>
                                      <img
                                        crossOrigin="anonymous"
                                        style={{
                                          width: "100%",
                                          borderRadius: "1px",
                                        }}
                                        src={selectedNFT?.img}
                                        alt=""
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        alignItems="center"
                                        style={{
                                          marginTop: "2.5px",
                                        }}
                                      >
                                        <Grid item>
                                          <Style.MoreInfoSymbol>
                                            {selectedNFT.symbol} #{selectedNFT.id}
                                          </Style.MoreInfoSymbol>
                                        </Grid>

                                        <Grid item>
                                          {isSelectedNFTPlaceholder ? (
                                            <Style.ExempleItem>PLACEHOLDER</Style.ExempleItem>
                                          ) : null}
                                        </Grid>

                                        <Grid item flexGrow={1}>
                                          <Grid container direction="row-reverse">
                                            {!isSelectedNFTPlaceholder ? (
                                              <Grid item>
                                                <Style.MutatorRemove>
                                                  <Clickable onClick={() => resetItem()}>
                                                    REMOVE
                                                  </Clickable>
                                                </Style.MutatorRemove>
                                              </Grid>
                                            ) : null}
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Grid item xs={12} style={{ marginTop: "5px" }}>
                                        <Grid container spacing={0.5}>
                                          <Grid item>
                                            <Clickable
                                              activated={!isSelectedNFTPlaceholder}
                                              address={`${openseaUrl}/${selectedNFT.address}/${selectedNFT.id}`}
                                            >
                                              <IconOpenSea
                                                style={{ width: "16.5px", height: "16.5px" }}
                                              />
                                            </Clickable>
                                          </Grid>
                                          <Grid item>
                                            <Clickable
                                              activated={!isSelectedNFTPlaceholder}
                                              address={`${blockExplorerUrl}/address/${selectedNFT.address}`}
                                            >
                                              <IconEtherscan
                                                style={{ width: "16.5px", height: "16.5px" }}
                                              />
                                            </Clickable>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {!showSelectNFT ? (
                <Grid item style={{ width: "100%" }}>
                  <Grid container justifyContent="center" alignItems="center" spacing={0.75}>
                    <Grid item xs={5} style={{ visibility: isConnected ? "visible" : "hidden" }}>
                      <Clickable
                        activated={isDropMintable}
                        onClick={() => setShowSelectNFT(!showSelectNFT)}
                      >
                        <Style.MintSelectNFT>SELECT YOUR NFT</Style.MintSelectNFT>
                      </Clickable>
                    </Grid>
                    <Grid item xs={12} />

                    <Grid item xs={3.5} style={{}}>
                      <animated.div style={springPropsMoreInfo as any}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            gap: 10,
                          }}
                        >
                          <IconMouse style={{ width: "15px", height: "22.5px" }} />
                          <Typos.Normal style={{ fontSize: "0.8em" }}>More Info</Typos.Normal>
                        </div>
                      </animated.div>
                    </Grid>
                    <Grid item xs={5}>
                      <Clickable
                        activated={mintButton.activated}
                        onClick={() => mintButton.action()}
                      >
                        <Style.MintButton>{mintButton.txt}</Style.MintButton>
                      </Clickable>
                    </Grid>
                    <Grid item xs={3.5} style={{}}></Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item style={{ width: "100%" }}>
                  <Grid container justifyContent="center" alignItems="center" spacing={0.75}>
                    <Grid item xs={12} />

                    <Grid item xs={3.5}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="left"
                        style={{ height: "100%" }}
                      >
                        <Clickable
                          onClick={() => {
                            setShowSelectNFT(false);
                            resetItem();
                          }}
                        >
                          <Grid item style={{ display: "flex", alignItems: "center" }}>
                            <ArrowRightAlt
                              style={{
                                transform: "rotate(180deg)",
                                marginRight: "5px",
                                height: "22.5px",
                              }}
                            />
                            <Typos.Normal style={{ fontSize: "0.8em" }}>Back</Typos.Normal>
                          </Grid>
                        </Clickable>
                      </Grid>
                    </Grid>
                    <Grid item xs={5}>
                      <Clickable
                        activated={mintMutateButton.activated}
                        onClick={() => mintMutateButton.action()}
                      >
                        <Style.MintButton>{mintMutateButton.txt}</Style.MintButton>
                      </Clickable>
                    </Grid>
                    <Grid item xs={3.5}></Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>

            {!showSelectNFT && (
              <Grid
                container
                direction="column"
                rowSpacing={5}
                style={{
                  padding: "1.5rem",
                }}
              >
                <Grid item style={{ width: "100%" }}>
                  <div style={{ width: "100%" }}>
                    <swiper-container slides-per-view={7.5} space-between={10}>
                      {drop.metadata.versions.map((item) => (
                        <swiper-slide key={item.id} style={{ height: "100%" }}>
                          <Clickable hoverAnimation={false} onClick={() => updateVersion(item.id)}>
                            <div
                              style={{
                                height: "13.5vh",
                                backgroundColor: item.color,
                                border: `1.5px solid ${
                                  selectedDripVersion === item.id
                                    ? theme.colors.black
                                    : "transparent"
                                }`,
                              }}
                            />
                            <div style={{ height: "1.7rem" }}>
                              <Typos.Normal
                                style={{ fontSize: "0.75em", fontWeight: 400, marginTop: "0.3rem" }}
                              >
                                {item.name}
                              </Typos.Normal>
                            </div>
                          </Clickable>
                        </swiper-slide>
                      ))}
                    </swiper-container>
                  </div>
                </Grid>
                <Grid item>
                  <Faq
                    content={[
                      {
                        question: "Description",
                        answer: (
                          <>
                            A DRIP is per say an NFT in itself and therefore it is a digital asset.
                            However, thanks to our technology it takes form both in the real world
                            and the metaverse.
                          </>
                        ),
                      },
                      {
                        question: "Specification",
                        answer: (
                          <>
                            <b>Deck</b>: Maple USA. Canadian Maple in 7 sheets with pressing made in
                            Europe.
                            <br />
                            <b>Graphic</b>: Full color HD SlipLayer printing.
                          </>
                        ),
                      },
                      {
                        question: "Shipping",
                        answer: (
                          <>
                            A DRIP is per say an NFT in itself and therefore it is a digital asset.
                            However, thanks to our technology it takes form both in the real world
                            and the metaverse.
                          </>
                        ),
                      },
                      {
                        question: "Payment",
                        answer: (
                          <>
                            A DRIP is per say an NFT in itself and therefore it is a digital asset.
                            However, thanks to our technology it takes form both in the real world
                            and the metaverse.
                          </>
                        ),
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// const DropRouteProxy: FC<{ sceneRef: sceneRefType }> = ({ sceneRef }) => {
//   const dropId = Number(useParams().dropId);

//   const { drop, isDropLoading, isDropError } = useDrop(dropId);

//   if (isDropLoading) {
//     return <DropLoading />;
//   }

//   if (isDropError) {
//     return <DropNotFound />;
//   }

//   return <DropComponent drop={drop!} sceneRef={sceneRef} />;
// };

export default DropComponent;
