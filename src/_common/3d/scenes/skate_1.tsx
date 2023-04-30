import React, { FC, Suspense, useEffect, useImperativeHandle, useMemo } from "react";
import * as THREE from "three";

import ModelSkate, {
  defaultSkateModelAnimation,
  ModelMetadataProps,
  SkateRefs,
  useSkateRefsLoader,
} from "@common/3d/models/skate";
import LoaderScene from "@common/3d/utils/loaderScene";
import { useFrame, useThree } from "@react-three/fiber";
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
  const cameraControls = React.useRef<CameraControls>(null!);
  const refCam = React.useRef(null!);
  const { setLoaded } = useSceneStore();

  const refs = useSkateRefsLoader();
  useImperativeHandle(props.sceneRef, () => sceneFunctions(refs, cameraControls, props));

  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], []);
  const { mouse, clock } = useThree();

  useFrame((state, delta) => {
    const t = clock.getElapsedTime();
    const ref = refs.groupRef.current as any;

    ref.rotation.z = (1 + Math.sin(t / 0.5)) / 90;
    ref.position.y = (1 + Math.sin(t / 0.6)) / 0.75;

    rEuler.set((-mouse.y * Math.PI) / 15, (mouse.x * Math.PI) / 15, 0);
    ref.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.05);
  });

  useEffect(() => {
    (refCam.current as any).lookAt(0, 40, 0);
    setLoaded(true);
  }, []);

  return (
    <>
      {/* <CameraControls ref={cameraControls} position={[0, 0, 130]} target={[0, 40, 0]} /> */}
      <PerspectiveCamera ref={refCam} makeDefault position={[0, 40, 145]} fov={40} />
      <spotLight intensity={0.05} angle={0.15} penumbra={1} position={[300, 300, 300]} castShadow />
      <ambientLight intensity={0.95} />

      <group position={[0, 40, 0]}>
        <ModelSkate refs={refs} three={{ group: {} }} {...props} />
      </group>

      <ContactShadows
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.25, -2.5, -0.5]}
        opacity={1}
        width={10}
        height={10}
        blur={1.5}
        far={15}
      />

      {/* <mesh {...props} castShadow receiveShadow>
        <icosahedronGeometry args={[10, 10]} />
      </mesh> */}

      {/* <ContactShadows scale={25} position={[0, -10, 0]} blur={5} opacity={1} /> */}
    </>
  );
});

export default SceneLoader;
