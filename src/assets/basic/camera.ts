import * as THREE from "three";
import { InitialCameraPosition } from "../../utils/constants";

export const getCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = InitialCameraPosition;

  return camera;
};
