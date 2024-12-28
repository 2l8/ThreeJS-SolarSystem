export interface IGuiState {
  orbitSpeedMultiplier: number;
  axleSpeedMultiplier: number;
}

export const initialGuiState: IGuiState = {
  orbitSpeedMultiplier: 0,
  axleSpeedMultiplier: 1,
};
