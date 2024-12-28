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
import { IEventManager } from "../../utils/eventsManager";

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
  private timePassed: number = 0;
  private readonly speed: number;
  private readonly orbitXDiameter: number;
  private readonly orbitYDiameter: number;
  private readonly xShift: number;
  private readonly castedInclination: number;

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
    orbit.rotation.x = Math.PI / 2 - inclination;

    return orbit;
  };

  private readonly updatePosition = (shift: number) => {
    if (!this.celestialData.orbit) {
      return;
    }

    this.timePassed += shift;
    const x =
      this.orbitXDiameter *
        Math.cos(this.speed * this.state.speedMultiplier * this.timePassed) +
      this.xShift;
    const y =
      this.orbitYDiameter *
      Math.sin(this.speed * this.state.speedMultiplier * this.timePassed) *
      Math.sin(this.castedInclination);
    const z =
      this.orbitYDiameter *
      Math.sin(this.speed * this.state.speedMultiplier * this.timePassed) *
      Math.cos(this.castedInclination);

    this.sphere.position.set(x, y, z);

    if (this.celestialData.name === "Earth") {
      console.log(this.sphere.position);
    }
  };

  constructor(
    public celestialData: ICelestialData,
    private scene: Scene,
    private gui: GUI,
    private eventsManager: IEventManager,
    private state: { speedMultiplier: number }
  ) {
    const radius = this.celestialData.sphere.radius;
    this.orbitXDiameter = this.celestialData.orbit
      ? this.celestialData.orbit.semimajor * OrbitSizeCoefficient
      : 0;
    this.orbitYDiameter = this.celestialData.orbit
      ? this.celestialData.orbit.semiminor * OrbitSizeCoefficient
      : 0;
    this.xShift = this.celestialData.orbit
      ? (this.celestialData.orbit.aphelion -
          this.celestialData.orbit.semimajor) *
        OrbitSizeCoefficient
      : 0;
    this.speed = this.celestialData.orbit
      ? (2 * Math.PI) / this.celestialData.orbit.siderealPeriod
      : 0;

    this.castedInclination = this.celestialData.orbit
      ? castInclination(this.celestialData.orbit?.inclination)
      : 0;

    this.guiGroup = this.gui.addFolder(this.celestialData.name);
    this.guiGroup.close();

    this.sphere = this.getSphere(radius, this.orbitXDiameter, this.xShift);

    if (!this.celestialData.orbit) {
      return;
    }
    this.orbit = this.getOrbit(
      this.orbitXDiameter,
      this.orbitYDiameter,
      this.xShift,
      this.castedInclination
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

  public readonly startAnimation = () => {
    this.eventsManager.addEvent("tick", this.updatePosition);
  };

  public readonly stopAnimation = () => {
    this.eventsManager.removeEvent("tick", this.updatePosition);
  };
}
