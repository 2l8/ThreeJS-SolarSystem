import { Color, PointLight } from "three";
import { InitialLightIntensity } from "../../utils/constants";

export const getLight = () => {
  const light = new PointLight(new Color(0xedede4), InitialLightIntensity);
  light.position.set(0, 0, 0);

  return light;
};
