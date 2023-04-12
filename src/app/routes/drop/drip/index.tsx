import React, { FC, useEffect, useState } from "react";

import { sceneRefType } from "@common/3d/scenes/skate_1";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Grid, ImageList, ImageListItem, Modal } from "@mui/material";
import { Drip, DripStatus, dripStatus, Drop, NFT } from "@premier-types";
import { ethers } from "ethers";

import { useCState } from "@common/3d/utils/hooks";
import CenterItem from "@common/components/grid/centerItem";
import { useImagePreloader } from "@common/hooks/imagePreloader";
import Clickable from "@common/components/clickable";
import Pastille from "@common/components/pastille";
import Tooltip from "@common/components/tooltip";

import { useDispatch, useSelector } from "@app/store/hooks";
import { useGetAssetsQuery, useGetDripQuery } from "@app/store/services";
import { mint, mintDefault, mutate, resetMintingProcess } from "@app/store/services/web3";
import Style from "./style";
import { useParams } from "react-router-dom";
import { useSceneStore } from "../../../../_common/3d/hooks/hook";
import { shortenAddress } from "@app/utils";
import { CONFIG } from "@common/config";
import { IconEth, IconEtherscan, IconOpenSea } from "@common/assets/images";

const { parseEther: toEth, formatEther, formatBytes32String } = ethers.utils;
const { AddressZero } = ethers.constants;

const DripRouteProxy: FC<{ drop: Drop; sceneRef: sceneRefType }> = ({ drop, sceneRef }) => {
  const dropId = drop.id;
  const dripId = Number(useParams().dripId);

  const isDripParamError = isNaN(dripId);
  const {
    data: drip,
    isLoading: isLoadingDrip,
    isError: isErrorDrip,
    isSuccess: isSuccessDrip,
  } = useGetDripQuery({ dropId, dripId }, { skip: isDripParamError });
  const isDripQueryError = !isSuccessDrip || isErrorDrip || !drip;

  if (isLoadingDrip) {
    return <>Loading</>; // TODO
  }

  if (isDripQueryError) {
    return <>Not Found</>; // TODO
  }

  if (isDripQueryError) {
    return <>Not Found</>; // TODO
  }

  return <DripComponent drop={drop} drip={drip} sceneRef={sceneRef} />;
};

const DripComponent: FC<{ drop: Drop; drip: Drip; sceneRef: sceneRefType }> = ({
  drop,
  drip,
  sceneRef,
}) => {
  const { auth, address, name, txProcess } = useSelector((state) => state.web3);
  const dispatch = useDispatch();

  const isDripMutated = drip.status === DripStatus.MUTATED;

  // fetch data
  const { data: assets, isLoading } = useGetAssetsQuery(
    { address: address },
    { skip: !auth || isDripMutated }
  );

  const placeholderItem: NFT = {
    address: AddressZero,
    img: "/placeholder.png",
    id: 0,
    name: "",
    symbol: "",
  };

  // fc state
  const [currentItem, setItem] = useState<NFT>(drip.nft || placeholderItem);
  const [currentVersion, setVersion] = useState(drip.version || 0);

  const isPlaceholderItem = currentItem.address === placeholderItem.address;

  const { isLoaded } = useSceneStore();

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

  const updateVersion = (version: number, item?: NFT) => {
    if (!sceneRef.current) return;

    setVersion(version);
    sceneRef.current.updateVersion(
      0,
      version,
      drop.symbol,
      (item?.name === undefined ? currentItem.name : item?.name) +
        " #" +
        (item?.id === undefined ? currentItem.id : item?.id)
    );
  };

  useEffect(() => {
    if (isLoaded) {
      updateItem(drip.nft || placeholderItem);
      updateVersion(drip.version, drip.nft || placeholderItem);
    }
  }, [isLoaded, drip]);

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
  };

  // Mutation
  const isMutated = txProcess.mutating.done;

  const modalActions = [
    {
      isDisplay: true,
      isMyTurn: !isMutated,
      stepName: "MUTATE",
      text: (
        <Style.TextModal>
          Ah, finally ! Let's mutate your <b>Drip</b> with your{" "}
          <b>
            {currentItem.symbol}#{currentItem.id}
          </b>{" "}
          !
        </Style.TextModal>
      ),
      isLoading: txProcess.mutating.loading,
      isDone: txProcess.mutating.done,
      tx: txProcess.mutating.tx,
      price: "0.0",
      action: {
        name: "MUTATE",
        fct: () => {
          dispatch(
            mutate({
              address: drop.address,
              tokenId: drip.id,
              contractMutator: currentItem.address,
              tokenIdMutator: currentItem.id,
            })
          );
        },
      },
    },
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
                            <ContentCopyIcon style={{ width: "14.5px" }} />
                          </Clickable>
                        </CenterItem>
                        <CenterItem item>
                          <Clickable address={`${CONFIG.blockExplorerUrl}/tx/${step.tx}`}>
                            <IconEtherscan style={{ width: "16.5px" }} />
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
                                <IconEth style={{ width: "12.5px" }} />
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
                marginRight: "25px",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Grid container direction="row-reverse">
                    <Grid item>
                      <Clickable
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
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

      <Style.Root container justifyContent="space-between" columns={50}>
        <Grid
          item
          xs={12}
          style={{
            zIndex: 10,
            height: "100%",
            visibility: isDripMutated || drip.owner !== address ? "hidden" : "visible",
          }}
        >
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
                <Style.BodyLeftSide $connected={auth}>
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
                    ) : auth ? (
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
        <Grid item xs={12} xl={9} style={{ zIndex: 10 }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
          >
            <Grid item flexGrow={1}>
              <Style.InfoDiv>
                <Grid container>
                  <Grid item xs={12}>
                    <Style.InfoDivItemName>PLACEHOLDER</Style.InfoDivItemName>
                  </Grid>
                  {isDripMutated ? (
                    <Grid item xs={6} xl={12}>
                      <img
                        style={{
                          width: "100%",
                          borderRadius: "15px",
                        }}
                        src={drip.nft?.img}
                        alt=""
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={6} xl={12}>
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
                  )}

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
                          <Style.ItemDescriptionMode>PLACEHOLDER</Style.ItemDescriptionMode>
                        ) : null}
                      </Grid>

                      {!isDripMutated && (
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
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} style={{ marginTop: "5px", height: "20px" }}>
                    <Grid container spacing={0.5}>
                      <Grid item>
                        <Clickable
                          activated={!isPlaceholderItem}
                          address={`${CONFIG.openseaUrl}/${currentItem.address}/${currentItem.id}`}
                        >
                          <IconOpenSea style={{ width: "16.5px" }} />
                        </Clickable>
                      </Grid>
                      <Grid item>
                        <Clickable
                          activated={!isPlaceholderItem}
                          address={`${CONFIG.blockExplorerUrl}/address/${currentItem.address}`}
                        >
                          <IconEtherscan style={{ width: "16.5px" }} />
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
                    <Style.BottomBarContainer container justifyContent="center" alignItems="center">
                      <Grid item xs={12}>
                        <Style.GalleryWrap>
                          <Style.GalleryItem
                            $onHover={false}
                            color={drop.metadata.versions[drip.version].texture}
                            style={{
                              height: "50px",
                              borderRadius: "5px",
                            }}
                          />
                        </Style.GalleryWrap>
                      </Grid>
                    </Style.BottomBarContainer>
                  </Style.BottomBar>
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
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Style.InfoDivItemName>INFO</Style.InfoDivItemName>
                    </Grid>

                    <Grid item>
                      <Style.InfoDivItemStatus>{dripStatus(drip.status)}</Style.InfoDivItemStatus>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Style.OwnerContainer>
                    <Grid container>
                      <Grid item xs={12}>
                        <Style.InfoContainerLeft>Owner : </Style.InfoContainerLeft>
                        <Style.InfoContainerRight>
                          {shortenAddress(drip.owner) + (drip.owner === address ? " (you)" : "")}
                        </Style.InfoContainerRight>
                      </Grid>

                      <Grid item xs={12}>
                        <Style.InfoContainerLeft>Mint Price : </Style.InfoContainerLeft>
                        <Style.InfoContainerRight>
                          {formatEther(drop.price)} ETH
                        </Style.InfoContainerRight>
                      </Grid>

                      <Grid item xs={12}>
                        <Style.InfoContainerLeft>Id : </Style.InfoContainerLeft>
                        <Style.InfoContainerRight>{drip.id}</Style.InfoContainerRight>
                      </Grid>
                    </Grid>
                  </Style.OwnerContainer>
                </Grid>
              </Style.InfoDiv>
            </Grid>

            <div
              style={{
                marginTop: "15px",
                paddingTop: "15px",
                borderTop: "1.5px solid lightgrey",
              }}
            />

            <Grid
              item
              style={{
                alignItems: "end",
                display: "flex",
              }}
            >
              <Style.ContainerInfo>
                <Grid container justifyContent="space-between">
                  <Style.ContainerTitle>DRIP #{drip.id}</Style.ContainerTitle>
                  <div>
                    <Style.ContainerTitle2>DROP #{drop.id}</Style.ContainerTitle2>
                  </div>
                </Grid>

                <Style.ContainerPayment>
                  <Grid container columnSpacing={1}>
                    {isDripMutated ? (
                      <Grid item xs={7}>
                        <Clickable activated={false}>
                          <Style.MintButton>REDEEM</Style.MintButton>
                        </Clickable>
                      </Grid>
                    ) : (
                      <Grid item xs={7}>
                        <Clickable
                          activated={!isPlaceholderItem && address === drip.owner}
                          onClick={() => {
                            setOpen(true);
                            dispatch(resetMintingProcess());
                          }}
                        >
                          <Style.MintButton>MUTATE</Style.MintButton>
                        </Clickable>
                      </Grid>
                    )}

                    <Grid item xs={5}>
                      <Clickable address={`/app/drop/${drop.id}`}>
                        <Style.MintButton>VIEW DROP</Style.MintButton>
                      </Clickable>
                    </Grid>
                  </Grid>
                </Style.ContainerPayment>
              </Style.ContainerInfo>
            </Grid>
          </Grid>
        </Grid>
      </Style.Root>
    </>
  );
};

export default DripRouteProxy;
