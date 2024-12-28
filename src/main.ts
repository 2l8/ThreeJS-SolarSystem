import "./style.css";
import Stats from "three/addons/libs/stats.module.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { getCamera } from "./features/camera/camera";
import { getOrbitControl } from "./features/camera/orbitControl";
import { getRenderer } from "./features/rendering/renderer";
import { getScene } from "./features/rendering/scene";
import { CelestialObjectsData } from "./features/celestial/celestialObjectsData";
import { initialCameraState } from "./features/camera/cameraState";
import { Celestial } from "./features/celestial/celestial";
import { addCustomSelectControl } from "./features/gui/helpers";
import { getCelestialByName } from "./features/celestial/helpers";
import { EventManager } from "./utils/eventsManager";
import { getClock } from "./features/rendering/clock";
import { initialGuiState } from "./features/gui/guiState";

const state = {
  camera: { ...initialCameraState },
  gui: { ...initialGuiState },
};

// init events manager
const eventsManager = new EventManager();

// init scene
const scene = getScene();

// init gui
const gui = new GUI();

// init clock
const clock = getClock();

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
const orbitControl = getOrbitControl(camera, renderer, scene);

// init stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// init objects
const objectsFolder = gui.addFolder("Celestial objects");
objectsFolder.close();

const celestials = CelestialObjectsData.map((obj) => {
  const celestial = new Celestial(
    obj,
    scene,
    objectsFolder,
    eventsManager,
    state.gui
  );
  celestial.render();
  celestial.startAnimation();
  return celestial;
});

addCustomSelectControl(
  gui,
  state.camera,
  "center",
  "Center around",
  CelestialObjectsData.map((obj) => obj.name),
  (value) => {
    const selectedCelestial = getCelestialByName(celestials, value);
    if (selectedCelestial) {
      const position = selectedCelestial.getPosition();
      orbitControl.target.set(position.x, position.y, position.z);

      const gap = selectedCelestial.celestialData.sphere.radius + 1;
      camera.position.set(position.x + gap, position.y + gap, position.z + gap);
      orbitControl.update();
    }
  }
);

function animate() {
  eventsManager.fireEvent("tick", clock.getDelta());

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  stats.update();
}

animate();
