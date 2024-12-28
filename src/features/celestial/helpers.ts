import { ICelestial } from "./celestial";

export const getCelestialByName = (celestials: ICelestial[], name: string) => {
  return celestials.find((celestial) => celestial.celestialData.name === name);
};

export const calculateSemiminor = (semimajor: number, eccentricity: number) => {
  return semimajor * Math.sqrt(1 - Math.pow(eccentricity, 2));
};

export const normInclination = (tilt: number) => Math.PI * (tilt / 180);

export const phaseToTime = (phase: number, period: number) => {
  return (phase / 360) * period;
};
