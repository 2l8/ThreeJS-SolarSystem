import { Camera, WebGLRenderer, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const getOrbitControl = (
  camera: Camera,
  renderer: WebGLRenderer,
  scene: Scene
) => {
  const cameraOrbitControl = new OrbitControls(camera, renderer.domElement);
  cameraOrbitControl.addEventListener("change", () => {
    renderer.render(scene, camera);
  });

  return cameraOrbitControl;
};
