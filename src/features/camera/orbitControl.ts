import { Camera, WebGLRenderer, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { InitialCameraPosition } from "../../utils/constants";

export const getOrbitControl = (
  camera: Camera,
  renderer: WebGLRenderer,
  scene: Scene
) => {
  const lsKey = "cameraPosition";

  const cameraOrbitControl = new OrbitControls(camera, renderer.domElement);
  const savedData = localStorage.getItem(lsKey);
  const { x, y, z } = savedData ? JSON.parse(savedData) : InitialCameraPosition;
  camera.position.set(x, y, z);
  cameraOrbitControl.update();

  cameraOrbitControl.addEventListener("change", () => {
    renderer.render(scene, camera);

    localStorage.setItem(lsKey, JSON.stringify(camera.position));
  });

  return cameraOrbitControl;
};
