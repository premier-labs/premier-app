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

  const theme = useTheme();

  const mq_md = useMediaQuery(theme.breakpoints.down("md"));
  if (mq_md) {
    console.log("Mobile in Model");
  }

  useEffect(() => {
    setLoaded(true);
  }, []);

  const cameraControls = React.useRef<CameraControls>(null!);

  const refs = useSkateRefsLoader();
  useImperativeHandle(props.sceneRef, () => sceneFunctions(refs, cameraControls, props));

  return (
    <>
      <CameraControls ref={cameraControls} distance={65} />

      <ambientLight intensity={0.975} />
      <ModelSkate
        refs={refs}
        {...props}
        three={{ group: { position: mq_md ? [0, -5, 0] : [0, 0, 0] } }}
      />
    </>
  );
});

export default SceneLoader;
