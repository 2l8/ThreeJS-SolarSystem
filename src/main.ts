import "./style.css";
import Stats from "three/addons/libs/stats.module.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { getSun } from "./assets/celestial/sun";
import { getCamera } from "./assets/basic/camera";
import { getOrbitControl } from "./assets/basic/orbitControl";
import { getRenderer } from "./assets/basic/renderer";
import { getScene } from "./assets/basic/scene";
import { getMercury } from "./assets/celestial/mercury";
import { getJupiter } from "./assets/celestial/jupiter";
import { getNeptune } from "./assets/celestial/neptune";

// init scene
const scene = getScene();

// init gui
new GUI();

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
const sun = getSun();
scene.add(sun.object);

const mercury = getMercury();
scene.add(mercury.orbit);
scene.add(mercury.object);

const jupiter = getJupiter();
scene.add(jupiter.orbit);
scene.add(jupiter.object);

const neptune = getNeptune();
scene.add(neptune.orbit);
scene.add(neptune.object);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  stats.update();
}

animate();
