import {
  BufferGeometry,
  EllipseCurve,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshNormalMaterial,
  SphereGeometry,
} from "three";
import {
  PlanetSizeCoefficient,
  OrbitColor,
  OrbitSizeCoefficient,
} from "../../utils/constants";

export const getNeptune = () => {
  const radius = 24622;
  const orbitXDiameter = 4452940833 * OrbitSizeCoefficient;
  const orbitYDiameter = 4553946490 * OrbitSizeCoefficient;

  const objectGeometry = new SphereGeometry(radius * PlanetSizeCoefficient);
  const objectMaterial = new MeshNormalMaterial({ wireframe: true });
  const object = new Mesh(objectGeometry, objectMaterial);
  object.position.x = orbitXDiameter;

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
  orbit.rotation.x = Math.PI / 2;

  return { object, orbit };
};
