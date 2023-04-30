import React, { FC } from "react";

import SceneLoader, { sceneRef } from "@common/3d/scenes/skate_1";
import { Route, Routes, useParams } from "react-router-dom";

import DropComponent from "./drop";
import DripComponent from "./drip";
import useDrop from "@app/hooks/useDrop";
import ErrorComponent from "@app/components/error";
import { useTheme } from "@mui/material/styles";

const DropRoutes: FC = ({}) => {
  const sceneRef = React.useRef<sceneRef>(null!);
  const theme = useTheme();
  const dropId = Number(useParams().dropId);

  const { drop, isDropLoading, isDropError } = useDrop(dropId);

  if (isDropLoading) {
    return <DropLoading />;
  }

  if (isDropError) {
    return <DropNotFound />;
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: `calc(100% - ${theme.header.height})`,
          zIndex: 10,
        }}
      >
        <SceneLoader
          sceneRef={sceneRef}
          model={drop.metadata.model}
          versions={drop.metadata.versions}
          initialVersion={0}
          initialPlaceholderTexture={"/placeholder.png"}
          initialDropId={drop.id}
          initialDripId={0}
          initialMaxSupply={drop.maxSupply}
        />
      </div>
      <Routes>
        <Route path="/:dripId" element={<DripComponent drop={drop} sceneRef={sceneRef} />} />
        <Route path="/" element={<DropComponent drop={drop} sceneRef={sceneRef} />} />
      </Routes>
    </>
  );
};

const DropLoading: FC = () => {
  return <></>;
};

const DropNotFound: FC = () => {
  return <ErrorComponent text="The Drop you are trying to access doesn't exist." />;
};

const DropRoutesProxy: FC = ({}) => {
  return (
    <>
      <Routes>
        <Route path="/:dropId/*" element={<DropRoutes />} />
        <Route path="/" element={<></>} />
      </Routes>
    </>
  );
};

export default DropRoutesProxy;
