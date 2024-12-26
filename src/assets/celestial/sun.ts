import { Mesh, MeshNormalMaterial, SphereGeometry } from "three";
import { SunSizeCoefficient } from "../../utils/constants";

export const getSun = () => {
  const radius = 700000;
  const geometry = new SphereGeometry(radius * SunSizeCoefficient);
  const material = new MeshNormalMaterial({ wireframe: true });
  const object = new Mesh(geometry, material);

  return {
    object,
  };
};
