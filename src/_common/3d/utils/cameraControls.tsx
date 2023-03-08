/* eslint-disable */
import { extend, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber";
import CameraControlsDefault from "camera-controls";
import { ForwardedRef, forwardRef, MutableRefObject, useEffect, useRef } from "react";
import {
  Box3,
  MathUtils,
  Matrix4,
  MOUSE,
  Quaternion,
  Raycaster,
  Sphere,
  Spherical,
  Vector2,
  Vector3,
  Vector4,
} from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      cameraControlsDefault: ReactThreeFiber.Node<
        CameraControlsDefault,
        typeof CameraControlsDefault
      >;
    }
  }
}

const subsetOfTHREE = {
  MOUSE: MOUSE,
  Vector2: Vector2,
  Vector3: Vector3,
  Vector4: Vector4,
  Quaternion: Quaternion,
  Matrix4: Matrix4,
  Spherical: Spherical,
  Box3: Box3,
  Sphere: Sphere,
  Raycaster: Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp,
  },
};

CameraControlsDefault.install({ THREE: subsetOfTHREE });
extend({ CameraControlsDefault });

export const CameraControls = forwardRef<
  CameraControlsDefault,
  { position: [number, number, number]; target: [number, number, number] }
>((props, ref) => {
  const cameraControls = useRef<CameraControlsDefault>(null);
  const camera = useThree((state) => state.camera);
  const renderer = useThree((state) => state.gl);
  useFrame((_, delta) => cameraControls.current?.update(delta));

  useEffect(
    () => () => {
      cameraControls.current?.dispose();
    },
    []
  );

  useEffect(() => {
    cameraControls.current?.setPosition(...props.position);
    cameraControls.current?.setTarget(...props.target);
  }, []);
  return (
    <cameraControlsDefault
      ref={mergeRefs<CameraControlsDefault>(cameraControls, ref)}
      args={[camera, renderer.domElement]}
    />
  );
});

export type CameraControls = CameraControlsDefault;

function mergeRefs<T>(...refs: (MutableRefObject<T> | ForwardedRef<T>)[]) {
  return (instance: T): void => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
    }
  };
}
