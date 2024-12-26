export const calculateSemiminor = (semimajor: number, eccentricity: number) => {
  return semimajor * Math.sqrt(1 - Math.pow(eccentricity, 2));
};

export const castInclination = (tilt: number) => Math.PI * (tilt / 180);
