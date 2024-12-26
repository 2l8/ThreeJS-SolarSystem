import { Color, Scene } from "three";

export const getScene = () => {
  const scene = new Scene();
  scene.background = new Color(0x101010);

  return scene;
};
