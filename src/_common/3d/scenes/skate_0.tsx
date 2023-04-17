import React, { FC, forwardRef, Suspense, useImperativeHandle } from "react";

import { OrbitControls } from "@react-three/drei";

import ModelSkate, {
  SkateRefs,
  useSkateRefsLoader,
  ModelMetadataProps,
  defaultSkateModelAnimation,
} from "@common/3d/models/skate";
import LoaderScene from "@common/3d/utils/loaderScene";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Loader } from "../utils/loader";

export type sceneRef = ReturnType<typeof sceneFunctions>;
export type sceneRefType = React.MutableRefObject<sceneRef>;
const sceneFunctions = (refs: SkateRefs, props: ModelMetadataProps) => ({
  ...defaultSkateModelAnimation(refs, props),
});

const SceneLoader: FC<ModelMetadataProps & { sceneRef: sceneRefType }> = React.memo((props) => {
  return (
    <LoaderScene>
      <Suspense fallback={<Loader />}>
        <Scene {...props} />
      </Suspense>
    </LoaderScene>
  );
});

const Scene: FC<ModelMetadataProps & { sceneRef: sceneRefType }> = (props) => {
  const refs = useSkateRefsLoader();
  useImperativeHandle(props.sceneRef, () => sceneFunctions(refs, props));

  const { camera } = useThree();

  camera.position.set(0, 0, -58);
  camera.lookAt(0, 0, 0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const ref = refs.groupRef.current as any;

    ref.rotation.y = Math.sin(t / 1) / 10;
    ref.rotation.z = (1 + Math.sin(t / 1.5)) / 90;
    ref.position.y = (1 + Math.sin(t / 1)) / 1;
  });

  return (
    <>
      <ambientLight intensity={0.95} />
      <ModelSkate {...props} refs={refs} />
    </>
  );
};

export default SceneLoader;
