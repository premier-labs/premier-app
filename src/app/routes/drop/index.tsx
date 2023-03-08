import React, { FC, useState } from "react";

import SceneLoader, { sceneRef } from "@common/3d/scenes/skate_1";
import { Grid } from "@mui/material";
import { Drop } from "@premier-labs/types";
import { Route, Routes, useParams } from "react-router-dom";

import { CREDENTIALS } from "@common/constants";
import { useGetDropQuery } from "../../store/services";
import NotFound from "../404";
import Style from "./style";
import DropComponent from "./drop";
import DripComponent from "./drip";

const DropRoutes: FC = ({}) => {
  return (
    <>
      <Routes>
        <Route path="/:dropId/*" element={<DropAppRoutesProxy />} />
      </Routes>
    </>
  );
};

const DropAppRoutesProxy: FC = () => {
  const dropId = Number(useParams().dropId);

  const isDropParamError = isNaN(dropId);
  const {
    data: drop,
    isLoading: isLoadingDrops,
    isError: isErrorDrops,
    isSuccess: isSuccessDrops,
  } = useGetDropQuery({ dropId }, { skip: isDropParamError });
  const isDropQueryError = !isSuccessDrops || isErrorDrops || !drop;

  if (isLoadingDrops) {
    return <>Loading</>;
  }

  if (isDropQueryError) {
    return <NotFound />;
  }

  return <DropApp drop={drop} />;
};

const DropApp: FC<{ drop: Drop }> = ({ drop }) => {
  const sceneRef = React.useRef<sceneRef>(null!);

  return (
    <Style.Root>
      <Style.BodyScene style={{ zIndex: 2 }}>
        <SceneLoader
          sceneRef={sceneRef}
          model={drop.metadata.model}
          versions={drop.metadata.versions}
          initialVersion={0}
          initialPlaceholderTexture={"/placeholder.png"}
          initialDropSymbol={drop.symbol}
          initialTokenNameId={"1" + " #" + 0}
          initialId={0}
        />
      </Style.BodyScene>

      <Style.RootChild>
        <Routes>
          <Route path="/:dripId" element={<DripComponent drop={drop} sceneRef={sceneRef} />} />
          <Route path="*" element={<DropComponent drop={drop} sceneRef={sceneRef} />} />
        </Routes>
      </Style.RootChild>

      <Style.Footer>
        <Grid container justifyContent="space-between">
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={6}>
                <Style.Credentials>{CREDENTIALS}</Style.Credentials>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid container flexDirection="row-reverse" columnSpacing={3}>
              <Grid item>
                <Style.Version>v1.0.0-beta</Style.Version>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Style.Footer>
    </Style.Root>
  );
};

export default DropRoutes;
