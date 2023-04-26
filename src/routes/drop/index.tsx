import React, { FC } from "react";

import { sceneRef } from "@common/3d/scenes/skate_1";
import { Route, Routes } from "react-router-dom";

import DropComponent from "./drop";
import DripComponent from "./drip";

const DropRoutes: FC = ({}) => {
  const sceneRef = React.useRef<sceneRef>(null!);

  return (
    <>
      <Routes>
        <Route path="/:dropId" element={<DropComponent sceneRef={sceneRef} />} />
        <Route path="/:dropId/:dripId" element={<DripComponent sceneRef={sceneRef} />} />
        <Route path="/" element={<></>} />
      </Routes>
    </>
  );
};

export default DropRoutes;
