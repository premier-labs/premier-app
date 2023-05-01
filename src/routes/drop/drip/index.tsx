import { placeholderItem } from "@app/_common/utils";
import ModalActionComponent from "@app/components/modalAction";
import SceneLoader, { sceneRefType } from "@common/3d/scenes/skate_1";
import { IconEtherscan, IconOpenSea } from "@common/assets/images";
import Box from "@common/components/box";
import Clickable from "@common/components/clickable";
import Typos from "@common/components/typography";
import { CONFIG } from "@common/config";
import { useImagePreloader } from "@common/hooks/imagePreloader";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Grid, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Drip, DripStatus, Drop, NFT } from "@premier-types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrip from "src/hooks/useDrip";
import { useMutate } from "src/hooks/useMutate";
import { useAccount } from "wagmi";
import Style from "./style";
import ErrorComponent from "@app/components/error";
import useNfts from "@app/hooks/useNfts";
import { useSceneStore } from "@app/_common/3d/hooks/hook";
import { shortenAddress } from "@app/utils";

const DripComponent: FC<{ drop: Drop; drip: Drip; isLoading: boolean; sceneRef: sceneRefType }> = ({
  drop,
  drip,
  isLoading,
  sceneRef,
}) => {
  // Preloading
  const {} = useImagePreloader(drop.metadata.versions.map((item) => item.texture));

  // Theming
  const theme = useTheme();

  // Web3 hooks
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { mutate, mutateReset, isMutateLoading, isMutateDone, isMutateError, mutateData } =
    useMutate();

  // Select NFT page
  const [showSelectNFT, setShowSelectNFT] = useState(false);

  // 3D
  const [selectedNFT, setSelectedNFT] = useState<NFT>(placeholderItem);

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

  const isMutable = drip && drip.status === DripStatus.DEFAULT;
  const isOwner = drip && address === drip.owner;
  const isSelectedNFTPlaceholder = selectedNFT.address === placeholderItem.address;

  // Server hooks

  // Assets
  const { nfts, isNftsLoading, isNftsError } = useNfts(address, {
    enabled: isConnected || isOwner || isMutable,
  });

  // Actions
  const [showActionModal, setShowActionModal] = React.useState(false);
  const hideActionModal = () => {
    setShowActionModal(false);
    mutateReset();
  };

  // Actions data

  const isDripMutated = isMutateDone;

  const modalActions = [
    {
      isDisplay: true,
      isMyTurn: !isDripMutated,
      stepName: "MUTATE",
      text: (
        <Style.TextModal>
          Ah, finally ! Let's mutate your <b>Drip</b> with your{" "}
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
        fct: () => mutate(drop.id, drip.id, selectedNFT.address, selectedNFT.id),
      },
    },
  ];

  // Buttons

  const mutateButton = (() => {
    if (!isConnected)
      return { txt: "CONNECT YOUR WALLET", action: () => openConnectModal?.(), activated: true };
    if (!isMutable) return { txt: "MUTATED", action: () => {}, activated: false };
    if (!isOwner) return { txt: "YOU ARE NOT THE OWNER", action: () => {}, activated: false };
    if (isSelectedNFTPlaceholder && !showSelectNFT)
      return {
        txt: "MUTATE",
        action: () => {
          setShowSelectNFT(true);
        },
        activated: true,
      };
    if (isSelectedNFTPlaceholder)
      return {
        txt: "SELECT YOUR NFT",
        action: () => {},
        activated: false,
      };

    return { txt: "MUTATE", action: () => setShowActionModal(true), activated: true };
  })();

  // Page life cycle

  const { isLoaded } = useSceneStore();

  // Handling change of Drip
  useEffect(() => {
    setShowSelectNFT(false);

    if (!isLoaded || !drip || !sceneRef.current) return;

    updateItem(drip?.nft || placeholderItem);
    sceneRef.current.updateVersion(drip.version);
  }, [isLoaded, drip]);

  return (
    <>
      {drip && (
        <ModalActionComponent
          drop={drop}
          showModal={showActionModal}
          onClose={() => hideActionModal()}
          modalActions={modalActions}
          dripId={drip.id}
          closeOnView
        />
      )}

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
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {drip && (
                      <Grid container spacing={1}>
                        <Grid item>
                          <Grid container spacing={0.5}>
                            <Grid item>
                              <Clickable
                                address={CONFIG.blockExplorerUrl + `/address/${drop.address}`}
                              >
                                <IconEtherscan style={{ width: "15px", height: "15px" }} />
                              </Clickable>
                            </Grid>
                            <Grid item>
                              <Clickable
                                address={CONFIG.openseaUrl + `/${drop.address}/${drip.id}`}
                              >
                                <IconOpenSea style={{ width: "15px", height: "15px" }} />
                              </Clickable>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>

                  {drip && (
                    <Grid item xs={12} style={{ marginBottom: "10px" }}>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typos.NormalTitle>
                            DROP
                            <span style={{ fontWeight: 500, fontFamily: theme.fontFamily.primary }}>
                              {` / ${drop.id} / `}
                            </span>
                            DRIP
                            <span style={{ fontWeight: 500, fontFamily: theme.fontFamily.primary }}>
                              {` / ${drip.id}`}
                            </span>
                          </Typos.NormalTitle>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    {drip && (
                      <Grid container spacing={1} style={{ marginBottom: "10px" }}>
                        <Grid item xs={12}>
                          <Style.MintPriceTitle>
                            {drip.nft ? (
                              <>
                                Mutated: {drip.nft?.symbol} #{drip.nft?.id}
                              </>
                            ) : (
                              <>Mutated: None</>
                            )}
                          </Style.MintPriceTitle>
                        </Grid>
                        <Grid item xs={12}>
                          <Style.MintPriceTitle>
                            Owner:{" "}
                            {shortenAddress(drip.owner) + (drip.owner === address ? " (you)" : "")}
                          </Style.MintPriceTitle>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Style.VersionButton>
                      <div
                        style={{
                          height: "22.5px",
                          width: "22.5px",
                          borderRadius: "25px",
                          border: `1px solid ${theme.colors.secondary}`,
                          backgroundColor: drop.metadata.versions[drip?.version || 0].color,
                        }}
                      />
                      <Typos.Normal style={{ fontSize: "0.75em" }}>
                        {drop.metadata.versions[drip?.version || 0].name}
                      </Typos.Normal>
                    </Style.VersionButton>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
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
                                                    ? `1px solid ${theme.colors.black}`
                                                    : "1px solid transparent",
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
                                        style={{
                                          width: "100%",
                                          borderRadius: "1px",
                                        }}
                                        crossOrigin="anonymous"
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
                                              address={`${CONFIG.openseaUrl}/${selectedNFT.address}/${selectedNFT.id}`}
                                            >
                                              <IconOpenSea
                                                style={{ width: "16.5px", height: "16.5px" }}
                                              />
                                            </Clickable>
                                          </Grid>
                                          <Grid item>
                                            <Clickable
                                              activated={!isSelectedNFTPlaceholder}
                                              address={`${CONFIG.blockExplorerUrl}/address/${selectedNFT.address}`}
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
                    <Grid item xs={3.5}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="left"
                        style={{ height: "100%" }}
                      >
                        <Clickable address={`/drop/${drop.id}`}>
                          <Grid item style={{ display: "flex", alignItems: "center" }}>
                            <ArrowRightAlt
                              style={{
                                transform: "rotate(180deg)",
                                marginRight: "5px",
                                height: "22.5px",
                              }}
                            />
                            <Typos.Normal style={{ fontSize: "0.8em" }}>Access Drop</Typos.Normal>
                          </Grid>
                        </Clickable>
                      </Grid>
                    </Grid>
                    <Grid item xs={5}>
                      <Clickable activated={mutateButton.activated} onClick={mutateButton.action}>
                        <Style.MintButton>{mutateButton.txt}</Style.MintButton>
                      </Clickable>
                    </Grid>
                    <Grid item xs={3.5}></Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item style={{ width: "100%" }}>
                  <Grid container justifyContent="center" alignItems="center" spacing={0.75}>
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
                      <Clickable activated={mutateButton.activated} onClick={mutateButton.action}>
                        <Style.MintButton>{mutateButton.txt}</Style.MintButton>
                      </Clickable>
                    </Grid>
                    <Grid item xs={3.5}></Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const DripRouteProxy: FC<{ sceneRef: sceneRefType; drop: Drop }> = ({ sceneRef, drop }) => {
  const dripId = Number(useParams().dripId);

  const { drip, isDripLoading, isDripError } = useDrip(drop.id, dripId);

  if (isDripError) {
    return <DripNotFound />;
  }

  return <DripComponent drop={drop} drip={drip!} isLoading={isDripLoading} sceneRef={sceneRef} />;
};

const DripNotFound: FC = () => {
  return <ErrorComponent text="The Drip you are trying to access doesn't exist." />;
};

export default DripRouteProxy;
