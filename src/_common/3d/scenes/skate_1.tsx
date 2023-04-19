import React, { FC, Suspense, useEffect, useImperativeHandle } from "react";

import ModelSkate, {
  defaultSkateModelAnimation,
  ModelMetadataProps,
  SkateRefs,
  useSkateRefsLoader,
} from "@common/3d/models/skate";
import LoaderScene from "@common/3d/utils/loaderScene";
import { useFrame } from "@react-three/fiber";
import { useR3fState } from "../utils/hooks";
import { Loader } from "../utils/loader";
import { OrbitControls } from "@react-three/drei";
import { useSceneStore } from "@common/3d/hooks/hook";
import { CameraControls } from "@react-three/drei";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {
  PerspectiveCamera,
  MeshTransmissionMaterial,
  ContactShadows,
  Environment,
} from "@react-three/drei";

export type sceneRef = ReturnType<typeof sceneFunctions>;
export type sceneRefType = React.MutableRefObject<sceneRef>;
const sceneFunctions = (
  refs: SkateRefs,
  camera: React.MutableRefObject<CameraControls>,
  props: ModelMetadataProps
) => ({
  ...refs,
  ...defaultSkateModelAnimation(refs, props),
  reset3DView() {
    camera.current?.setPosition(0, 40, -65, true);
  },
});

const SceneLoader: FC<ModelMetadataProps & { sceneRef: sceneRefType }> = React.memo(
  (props, ref) => {
    return (
      <LoaderScene>
        <Suspense fallback={<Loader />}>
          <Scene {...props} />
        </Suspense>
      </LoaderScene>
    );
  }
);

const Scene: FC<ModelMetadataProps & { sceneRef: sceneRefType }> = React.memo((props) => {
  const { setLoaded } = useSceneStore();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const cameraControls = React.useRef<CameraControls>(null!);

  const refs = useSkateRefsLoader();
  useImperativeHandle(props.sceneRef, () => sceneFunctions(refs, cameraControls, props));

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const ref = refs.groupRef.current as any;

    ref.rotation.z = (1 + Math.sin(t / 1.5)) / 90;
    ref.position.y = (1 + Math.sin(t / 0.7)) / 0.75;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 150]} fov={40} />
      <spotLight intensity={0.1} angle={0.15} penumbra={1} position={[300, 300, 300]} castShadow />
      <ambientLight intensity={0.95} />
      <ModelSkate refs={refs} {...props} />
    </>
  );
});

export default SceneLoader;
