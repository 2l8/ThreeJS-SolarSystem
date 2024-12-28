export interface IGuiState {
  orbitSpeedMultiplier: number;
  axleSpeedMultiplier: number;
}

export const initialGuiState: IGuiState = {
  orbitSpeedMultiplier: 250,
  axleSpeedMultiplier: 0.000000001,
};
