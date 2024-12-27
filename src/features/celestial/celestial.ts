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
  Vector3,
} from "three";
import { OrbitColor, OrbitSizeCoefficient } from "../../utils/constants";
import { ICelestialData } from "./celestialObjectsData";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { castInclination } from "../../utils/helpers";

export interface ICelestial {
  celestialData: ICelestialData;
  sphere: Mesh<SphereGeometry, MeshNormalMaterial, Object3DEventMap>;
  orbit?: Line<
    BufferGeometry<NormalBufferAttributes>,
    LineBasicMaterial,
    Object3DEventMap
  >;
  getPosition: () => Vector3;
}

export class Celestial implements ICelestial {
  public readonly guiGroup: GUI;
  public readonly sphere: Mesh<
    SphereGeometry,
    MeshNormalMaterial,
    Object3DEventMap
  >;
  public readonly orbit:
    | Line<
        BufferGeometry<NormalBufferAttributes>,
        LineBasicMaterial,
        Object3DEventMap
      >
    | undefined;

  constructor(
    public celestialData: ICelestialData,
    private scene: Scene,
    private gui: GUI
  ) {
    const radius = this.celestialData.sphere.radius;
    const orbitXDiameter = this.celestialData.orbit
      ? this.celestialData.orbit.semimajor * OrbitSizeCoefficient
      : 0;
    const orbitYDiameter = this.celestialData.orbit
      ? this.celestialData.orbit.semiminor * OrbitSizeCoefficient
      : 0;
    const shift = this.celestialData.orbit
      ? (this.celestialData.orbit.aphelion -
          this.celestialData.orbit.semimajor) *
        OrbitSizeCoefficient
      : 0;

    this.guiGroup = this.gui.addFolder(this.celestialData.name);
    this.guiGroup.close();

    this.sphere = this.getSphere(radius, orbitXDiameter, shift);

    if (!this.celestialData.orbit) {
      return;
    }
    this.orbit = this.getOrbit(
      orbitXDiameter,
      orbitYDiameter,
      shift,
      this.celestialData.orbit.inclination
    );
  }

  private readonly getSphere = (
    radius: number,
    orbitXDiameter: number,
    shift: number
  ) => {
    const sphereGeometry = new SphereGeometry(radius);
    const sphereMaterial = new MeshNormalMaterial({ wireframe: true });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = orbitXDiameter + shift;

    return sphere;
  };

  private readonly getOrbit = (
    orbitXDiameter: number,
    orbitYDiameter: number,
    shift: number,
    inclination: number
  ) => {
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
    orbit.rotation.x = Math.PI / 2 + castInclination(inclination);

    return orbit;
  };

  public readonly render = () => {
    this.guiGroup.add(this.sphere, "visible").name("Sphere visible");
    this.scene.add(this.sphere);

    if (!this.orbit) {
      return;
    }
    this.guiGroup.add(this.orbit, "visible").name("Orbit visible");
    this.scene.add(this.orbit);
  };

  public readonly getPosition = () => {
    return this.sphere.position;
  };
}
