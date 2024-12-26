import {
  BufferGeometry,
  EllipseCurve,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshNormalMaterial,
  NormalBufferAttributes,
  Object3DEventMap,
  Scene,
  SphereGeometry,
} from "three";
import { OrbitColor, OrbitSizeCoefficient } from "../../utils/constants";
import { ICelestialData } from "./celestialObjectsData";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

export interface ICelestial {
  sphere: Mesh<SphereGeometry, MeshNormalMaterial, Object3DEventMap>;
  orbit?: Line<
    BufferGeometry<NormalBufferAttributes>,
    LineBasicMaterial,
    Object3DEventMap
  >;
}

export const renderCelestial = (
  celestial: ICelestialData,
  scene: Scene,
  gui: GUI
): ICelestial => {
  const radius = celestial.sphere.radius;
  const orbitXDiameter = celestial.orbit
    ? celestial.orbit.semimajor * OrbitSizeCoefficient
    : 0;
  const orbitYDiameter = celestial.orbit
    ? celestial.orbit.semiminor * OrbitSizeCoefficient
    : 0;
  const shift = celestial.orbit
    ? (celestial.orbit.aphelion - celestial.orbit.semimajor) *
      OrbitSizeCoefficient
    : 0;
  const guiGroup = gui.addFolder(celestial.name);
  guiGroup.close();

  const sphereGeometry = new SphereGeometry(radius);
  const sphereMaterial = new MeshNormalMaterial({ wireframe: true });
  const sphere = new Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = orbitXDiameter + shift;
  scene.add(sphere);
  guiGroup.add(sphere, "visible").name("Sphere visible");

  if (!celestial.orbit) {
    return { sphere };
  }

  const curve = new EllipseCurve(
    0,
    0,
    orbitXDiameter,
    orbitYDiameter,
    0,
    2 * Math.PI,
    false,
    0
  );
  const points = curve.getPoints(500);
  const orbitGeometry = new BufferGeometry().setFromPoints(points);
  const orbitMaterial = new LineBasicMaterial({ color: OrbitColor });
  const orbit = new Line(orbitGeometry, orbitMaterial);
  orbit.position.x = shift;
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);
  guiGroup.add(orbit, "visible").name("Orbit visible");

  return { sphere, orbit };
};
