import {
  BufferGeometry,
  EllipseCurve,
  ImageUtils,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  NormalBufferAttributes,
  Object3DEventMap,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { OrbitColor, OrbitSizeCoefficient } from "../../utils/constants";
import { ICelestialData } from "./celestialObjectsData";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { IEventManager } from "../../utils/eventsManager";
import { normInclination, phaseToTime } from "./helpers";
import { IGuiState } from "../gui/guiState";
import { positionGeometry } from "three/tsl";

export interface ICelestial {
  celestialData: ICelestialData;
  sphere: Mesh<SphereGeometry, MeshStandardMaterial, Object3DEventMap>;
  orbit?: Line<
    BufferGeometry<NormalBufferAttributes>,
    LineBasicMaterial,
    Object3DEventMap
  >;
  getPosition: () => Vector3;
}

export class Celestial implements ICelestial {
  private timePassed: number = 0;
  private readonly initialPhase: number = 0;
  private readonly speed: number;
  private readonly rotationSpeed: number;
  private readonly orbitXDiameter: number;
  private readonly orbitYDiameter: number;
  private readonly xShift: number;
  private readonly castedInclination: number;

  public readonly guiGroup: GUI;
  public readonly sphere: Mesh<
    SphereGeometry,
    MeshStandardMaterial,
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
    const points = curve.getPoints(256);
    const orbitGeometry = new BufferGeometry().setFromPoints(points);
    const orbitMaterial = new LineBasicMaterial({ color: OrbitColor });
    const orbit = new Line(orbitGeometry, orbitMaterial);
    orbit.position.x = shift;
    orbit.rotation.x = Math.PI / 2 - inclination;

    return orbit;
  };

  private readonly getSphere = (
    radius: number,
    orbitXDiameter: number,
    shift: number
  ) => {
    const sphereGeometry = new SphereGeometry(radius, 1024);
    const sphereMaterial = new MeshStandardMaterial({
      flatShading: true,
    });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = orbitXDiameter + shift;

    return sphere;
  };

  private readonly updatePosition = (shift: number) => {
    if (!this.celestialData.orbit) {
      return;
    }

    this.timePassed += shift;
    const orbitNormalizedTime =
      (this.timePassed + this.initialPhase) * this.state.orbitSpeedMultiplier;

    const x =
      this.orbitXDiameter * Math.cos(this.speed * orbitNormalizedTime) +
      this.xShift;
    const y =
      this.orbitYDiameter *
      Math.sin(this.speed * orbitNormalizedTime) *
      Math.sin(this.castedInclination);
    const z =
      this.orbitYDiameter *
      Math.sin(this.speed * orbitNormalizedTime) *
      Math.cos(this.castedInclination);

    this.sphere.position.set(x, y, z);

    const axleNormalizedTime = this.timePassed * this.state.axleSpeedMultiplier;
    this.sphere.rotation.set(
      this.sphere.rotation.x,
      axleNormalizedTime * this.rotationSpeed,
      this.sphere.rotation.z
    );
  };

  constructor(
    public celestialData: ICelestialData,
    private scene: Scene,
    private gui: GUI,
    private eventsManager: IEventManager,
    private state: IGuiState,
    private textureLoader: TextureLoader
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
      ? (2 * Math.PI) / this.celestialData.orbit.yearPeriod
      : 0;
    this.rotationSpeed = this.celestialData.orbit
      ? (2 * Math.PI) / this.celestialData.orbit.dayPeriod
      : 0;

    this.castedInclination = this.celestialData.orbit
      ? normInclination(this.celestialData.orbit?.inclination)
      : 0;
    this.initialPhase = this.celestialData.orbit
      ? phaseToTime(
          this.celestialData.orbit.initialPhase,
          this.celestialData.orbit.yearPeriod
        )
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

  public readonly render = async () => {
    const texturePromise = this.celestialData.sphere.map
      ? this.textureLoader.loadAsync(this.celestialData.sphere.map)
      : Promise.resolve(undefined);

    const texture = await texturePromise;
    if (texture) {
      texture.colorSpace = SRGBColorSpace;
      this.sphere.material.map = texture;
    }

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
