import "./style.css";
import Stats from "three/addons/libs/stats.module.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { getCamera } from "./assets/basic/camera";
import { getOrbitControl } from "./assets/basic/orbitControl";
import { getRenderer } from "./assets/basic/renderer";
import { getScene } from "./assets/basic/scene";
import { CelestialObjectsData } from "./assets/celestial/celestialObjectsData";
import { renderCelestial } from "./assets/celestial/renderCelestial";

// init scene
const scene = getScene();

// init gui
const gui = new GUI();

// init camera
const camera = getCamera();

// init renderer
const renderer = getRenderer();

// browser resize handle
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// init orbit control
getOrbitControl(camera, renderer, scene);

// init stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// init objects
CelestialObjectsData.forEach((obj) => renderCelestial(obj, scene, gui));

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  stats.update();
}

animate();
