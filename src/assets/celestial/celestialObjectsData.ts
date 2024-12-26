import {
  PlanetSizeCoefficient,
  SunSizeCoefficient,
} from "../../utils/constants";

export interface ISphereData {
  radius: number;
}

export interface IOrbitData {
  semimajor: number;
  semiminor: number;
  eccentricity: number;
  perihelion: number;
  aphelion: number;
  inclination: number;
}

export interface ICelestialData {
  name: string;
  sphere: ISphereData;
  orbit?: IOrbitData;
}

export const CelestialObjectsData: ICelestialData[] = [
  {
    name: "Sun",
    sphere: { radius: 700000 * SunSizeCoefficient },
  },
  {
    name: "Mercury",
    sphere: { radius: 2439 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 46001009,
      aphelion: 69817445,
      semimajor: 57909227,
      eccentricity: 0.20563593,
      semiminor: 56671623,
      inclination: 3.38,
    },
  },
  {
    name: "Venus",
    sphere: { radius: 6052 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 107476259,
      aphelion: 108942109,
      semimajor: 108208930,
      eccentricity: 0.0068,
      semiminor: 108206428,
      inclination: 3.86,
    },
  },
  {
    name: "Earth",
    sphere: { radius: 6371 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 147098290,
      aphelion: 152098232,
      semimajor: 149598261,
      eccentricity: 0.01671123,
      semiminor: 149577370,
      inclination: 7.155,
    },
  },
  {
    name: "Mars",
    sphere: { radius: 3389 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 206655000,
      aphelion: 249232000,
      semimajor: 227943820,
      eccentricity: 0.0933941,
      semiminor: 226947527,
      inclination: 5.65,
    },
  },
  {
    name: "Jupiter",
    sphere: { radius: 69911 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 740573600,
      aphelion: 816520800,
      semimajor: 778547200,
      eccentricity: 0.048775,
      semiminor: 777620566,
      inclination: 6.09,
    },
  },
  {
    name: "Saturn",
    sphere: { radius: 58232 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 1353572956,
      aphelion: 1513325783,
      semimajor: 1429394069,
      eccentricity: 0.055723219,
      semiminor: 1427173154,
      inclination: 5.51,
    },
  },
  {
    name: "Uranus",
    sphere: { radius: 25362 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 2748938461,
      aphelion: 3004419704,
      semimajor: 2876679082,
      eccentricity: 0.044405586,
      semiminor: 2873841483,
      inclination: 6.48,
    },
  },
  {
    name: "Neptune",
    sphere: { radius: 24622 * PlanetSizeCoefficient },
    orbit: {
      perihelion: 4452940833,
      aphelion: 4553946490,
      semimajor: 4503443661,
      eccentricity: 0.011214269,
      semiminor: 4503160475,
      inclination: 6.43,
    },
  },
];
