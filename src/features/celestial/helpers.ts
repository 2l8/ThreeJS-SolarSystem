import { ICelestial } from "./celestial";

export const getCelestialByName = (celestials: ICelestial[], name: string) => {
  return celestials.find((celestial) => celestial.celestialData.name === name);
};
