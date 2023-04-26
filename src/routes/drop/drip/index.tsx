import { placeholderItem } from "@app/_common/utils";
import ModalActionComponent from "@app/components/modalAction";
import { useGetAssetsQuery } from "@app/store/services";
import SceneLoader, { sceneRefType } from "@common/3d/scenes/skate_1";
import { IconEtherscan, IconOpenSea } from "@common/assets/images";
import Box from "@common/components/box";
import Clickable from "@common/components/clickable";
import Typos from "@common/components/typography";
import { CONFIG } from "@common/config";
import { useImagePreloader } from "@common/hooks/imagePreloader";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Grid, ImageList, ImageListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Drip, DripStatus, NFT } from "@premier-types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrip from "src/hooks/useDrip";
import { useMutate } from "src/hooks/useMutate";
import { useAccount } from "wagmi";
import Style from "./style";
import ErrorComponent from "@app/components/error";

const DripComponent: FC<{ drip: Drip; sceneRef: sceneRefType }> = ({ drip, sceneRef }) => {
  const { drop } = drip;

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

  const isMutable = drip.status === DripStatus.DEFAULT;
  const isOwner = address === drip.owner;
  const isSelectedNFTPlaceholder = selectedNFT.address === placeholderItem.address;

  // Server hooks

  // Assets
  const { data: assets, isLoading } = useGetAssetsQuery(
    { address: address as string },
    { skip: !isConnected || !isOwner || !isMutable }
  );

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
        fct: () => mutate(drop.address, drip.id, selectedNFT.address, selectedNFT.id),
      },
    },
  ];

  // Buttons

  const mutateButton = (() => {
    if (!isConnected)
      return { txt: "CONNECT YOUR WALLET", action: () => openConnectModal?.(), activated: true };
    if (!isMutable) return { txt: "ALREADY MUTATED", action: () => {}, activated: false };
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

  // Handling change of Drip
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.updateItem(drip.nft?.img || placeholderItem.img);
    sceneRef.current.updateVersion(drip.version);
  }, [drip]);

  return (
    <>
      <ModalActionComponent
        drop={drop}
        showModal={showActionModal}
        onClose={() => hideActionModal()}
        modalActions={modalActions}
        dripId={drip.id}
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
            <SceneLoader
              sceneRef={sceneRef}
              model={drop.metadata.model}
              versions={drop.metadata.versions}
              initialVersion={0}
              initialPlaceholderTexture={drip.nft?.img || "/placeholder.png"}
              initialDropId={drop.id}
              initialDripId={0}
              initialMaxSupply={drop.maxSupply}
            />
            <div
              style={{
                position: "absolute",
                zIndex: 10000,
                bottom: 10,
                left: "50%",
                transform: "translate(-50%, -50%)",
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
                <Grid container spacing={1.25}>
                  <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Style.MintPriceTitle>
                          {drop.currentSupply} / {drop.maxSupply} Minted
                        </Style.MintPriceTitle>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} style={{ marginBottom: "10px" }}>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typos.NormalTitle>
                          DRIP{" "}
                          <span style={{ fontWeight: 500, fontFamily: theme.fontFamily.primary }}>
                            / {drop.id} /
                          </span>{" "}
                          <span style={{ fontWeight: 900, fontFamily: theme.fontFamily.primary }}>
                            #{drip.id}
                          </span>
                        </Typos.NormalTitle>
                      </Grid>

                      {/* <Grid item>
                        <Typos.Normal style={{ fontWeight: 300, fontSize: "1.25em" }}>
                          {formatEther(drop.price)} ETH
                        </Typos.Normal>
                      </Grid> */}
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item>
                        <Style.VersionButton>
                          <div
                            style={{
                              height: "22.5px",
                              width: "22.5px",
                              borderRadius: "25px",
                              border: `1px solid ${theme.colors.secondary}`,
                              backgroundColor: drop.metadata.versions[drip.version].color,
                            }}
                          />
                          <Typos.Normal style={{ fontSize: "0.75em" }}>
                            {drop.metadata.versions[drip.version].name}
                          </Typos.Normal>
                        </Style.VersionButton>
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
                                  {isConnected && assets && assets.length ? (
                                    assets.map((collection, index1) => (
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
                    <Grid item xs={5}>
                      <Clickable activated={mutateButton.activated} onClick={mutateButton.action}>
                        <Style.MintButton>{mutateButton.txt}</Style.MintButton>
                      </Clickable>
                    </Grid>
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

const DripRouteProxy: FC<{ sceneRef: sceneRefType }> = ({ sceneRef }) => {
  const dropId = Number(useParams().dropId);
  const dripId = Number(useParams().dripId);

  const { dripData, isDripLoading, isDripError } = useDrip(dropId, dripId);

  if (isDripLoading) {
    return <DripLoading />;
  }

  if (isDripError) {
    return <DripNotFound />;
  }

  return <DripComponent drip={dripData!} sceneRef={sceneRef} />;
};

const DripLoading: FC = () => {
  return <></>;
};

const DripNotFound: FC = () => {
  return <ErrorComponent text="The Drip you are trying to access doesn't exist." />;
};

export default DripRouteProxy;
