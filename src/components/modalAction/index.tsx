import { FC } from "react";

import React from "react";

import { IconEth, IconEtherscan } from "@common/assets/images";
import Clickable from "@common/components/clickable";
import CenterItem from "@common/components/grid/centerItem";
import { CONFIG } from "@common/config";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { BackdropProps, Grid, Modal } from "@mui/material";
import Style from "./style";
import { Drop } from "@premier-labs/contracts/dist/types";

export const ModalActionComponent: FC<{
  drop: Drop;
  showModal: boolean;
  onClose: Function;
  modalActions: {
    isDisplay: boolean;
    isMyTurn: boolean;
    stepName: string;
    text: any;
    isLoading: boolean;
    isDone: boolean;
    tx: string | undefined;
    price: string;
    action: {
      name: string;
      fct: Function;
    };
  }[];
  dripId: number | undefined;
  closeOnView?: boolean;
}> = ({ drop, showModal, onClose, modalActions, dripId, closeOnView }) => {
  return (
    <Style.Root>
      <Modal
        open={showModal}
        onClose={() => onClose()}
        slotProps={{
          backdrop: {
            style: {
              background: "rgba(0,0,0,0.7)",
            },
          },
        }}
      >
        <Style.ModelBox>
          <Grid container rowSpacing={1.5} flexWrap="wrap">
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
                    opacity: step.isDisplay ? 1 : 0.5,
                    marginTop: index === 0 ? "" : "15px",
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    style={{ marginBottom: "20px", opacity: step.isDisplay ? 1 : 0.1 }}
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

            <Grid item xs={12}>
              <Grid container direction="row-reverse">
                <Grid item>
                  {closeOnView ? (
                    <Clickable onClick={() => onClose()}>
                      <Style.FinalStep2 $display={modalActions[modalActions.length - 1].isDone}>
                        View
                      </Style.FinalStep2>
                    </Clickable>
                  ) : (
                    <Clickable address={`/drop/${drop.id}/${dripId}`}>
                      <Style.FinalStep2 $display={modalActions[modalActions.length - 1].isDone}>
                        View
                      </Style.FinalStep2>
                    </Clickable>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flex: 1,
                alignItems: "end",
                transition: "all .5s ease-in-out",
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  {modalActions.map(
                    (item, index) =>
                      item.isMyTurn && (
                        <Grid key={index} container spacing={2.5}>
                          <Grid item flexGrow={1}>
                            <Clickable key={index} onClick={item.action.fct}>
                              <Style.MintButton>{item.action.name}</Style.MintButton>
                            </Clickable>
                          </Grid>

                          <Grid item>
                            <Grid container>
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
                            </Grid>
                          </Grid>
                        </Grid>
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
    </Style.Root>
  );
};

export default ModalActionComponent;
