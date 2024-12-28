import {
  PlanetSizeCoefficient,
  SunSizeCoefficient,
} from "../../utils/constants";

export interface ISphereData {
  radius: number;
  map?: string;
}

export interface IOrbitData {
  semimajor: number;
  semiminor: number;
  eccentricity: number;
  perihelion: number;
  aphelion: number;
  inclination: number;
  yearPeriod: number;
  dayPeriod: number;
  initialPhase: number;
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
    sphere: {
      radius: 2439 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/mercury.jpg",
    },
    orbit: {
      perihelion: 46001,
      aphelion: 69817,
      semimajor: 57909,
      eccentricity: 0.20563593,
      semiminor: 56671,
      inclination: 3.38,
      yearPeriod: 2111,
      dayPeriod: 1416,
      initialPhase: 330,
    },
  },
  {
    name: "Venus",
    sphere: {
      radius: 6052 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/venus.jpg",
    },
    orbit: {
      perihelion: 107476,
      aphelion: 108942,
      semimajor: 108208,
      eccentricity: 0.0068,
      semiminor: 108206,
      inclination: 3.86,
      yearPeriod: 5392.8,
      dayPeriod: 5832,
      initialPhase: 95,
    },
  },
  {
    name: "Earth",
    sphere: {
      radius: 6371 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/earth.jpg",
    },
    orbit: {
      perihelion: 147098,
      aphelion: 152098,
      semimajor: 149598,
      eccentricity: 0.01671123,
      semiminor: 149577,
      inclination: 7.155,
      yearPeriod: 8766.1,
      dayPeriod: 24,
      initialPhase: 192,
    },
  },
  {
    name: "Mars",
    sphere: {
      radius: 3389 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/mars.webp",
    },
    orbit: {
      perihelion: 206655,
      aphelion: 249232,
      semimajor: 227943,
      eccentricity: 0.0933941,
      semiminor: 226947,
      inclination: 5.65,
      yearPeriod: 16488,
      dayPeriod: 24.5,
      initialPhase: 163,
    },
  },
  {
    name: "Jupiter",
    sphere: {
      radius: 69911 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/jupiter.jpg",
    },
    orbit: {
      perihelion: 740573,
      aphelion: 816520,
      semimajor: 778547,
      eccentricity: 0.048775,
      semiminor: 777620,
      inclination: 6.09,
      yearPeriod: 103944,
      dayPeriod: 10,
      initialPhase: 331,
    },
  },
  {
    name: "Saturn",
    sphere: {
      radius: 58232 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/saturn.jpg",
    },
    orbit: {
      perihelion: 1353572,
      aphelion: 1513325,
      semimajor: 1429394,
      eccentricity: 0.055723219,
      semiminor: 1427173,
      inclination: 5.51,
      yearPeriod: 257928,
      dayPeriod: 10.5,
      initialPhase: 267,
    },
  },
  {
    name: "Uranus",
    sphere: {
      radius: 25362 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/uranus.webp",
    },
    orbit: {
      perihelion: 2748938,
      aphelion: 3004419,
      semimajor: 2876679,
      eccentricity: 0.044405586,
      semiminor: 2873841,
      inclination: 6.48,
      yearPeriod: 734136,
      dayPeriod: 17,
      initialPhase: 329,
    },
  },
  {
    name: "Neptune",
    sphere: {
      radius: 24622 * PlanetSizeCoefficient,
      map: "../src/features/celestial/assets/neptune.jpg",
    },
    orbit: {
      perihelion: 4452940,
      aphelion: 4553946,
      semimajor: 4503443,
      eccentricity: 0.011214269,
      semiminor: 4503160,
      inclination: 6.43,
      yearPeriod: 1435200,
      dayPeriod: 16,
      initialPhase: 331,
    },
  },
];
