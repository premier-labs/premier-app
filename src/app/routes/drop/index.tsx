import React, { FC, useState } from "react";

import SceneLoader, { sceneRef } from "@common/3d/scenes/skate_1";
import { Grid } from "@mui/material";
import { Drop } from "@premier-types";
import { Route, Routes, useParams } from "react-router-dom";

import { CREDENTIALS } from "@common/constants";
import NotFound from "../404";
import Style from "./style";
import DropComponent from "./drop";
import DripComponent from "./drip";
import useDrop from "@app/hooks/useDrop";

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

  const { dropData, isDropLoading, isDropError, isDropDone } = useDrop(dropId, {
    skip: isDropParamError,
  });

  const isDropQueryError = isDropParamError || isDropError || dropData === undefined;

  if (isDropLoading) {
    return <>Loading</>;
  }

  if (isDropQueryError) {
    return <NotFound />;
  }

  return <DropApp drop={dropData} />;
};

const DropApp: FC<{ drop: Drop }> = ({ drop }) => {
  const sceneRef = React.useRef<sceneRef>(null!);

  return (
    <Style.Root>
      {/* <Style.BodyScene style={{ zIndex: 2 }}>
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
      </Style.BodyScene> */}

      <Style.RootChild>
        <Routes>
          <Route path="/:dripId" element={<DripComponent drop={drop} sceneRef={sceneRef} />} />
          <Route path="*" element={<DropComponent drop={drop} sceneRef={sceneRef} />} />
        </Routes>
      </Style.RootChild>

      <Style.Footer>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Style.Credentials>{CREDENTIALS}</Style.Credentials>
          </Grid>
        </Grid>
      </Style.Footer>
    </Style.Root>
  );
};

export default DropRoutes;
