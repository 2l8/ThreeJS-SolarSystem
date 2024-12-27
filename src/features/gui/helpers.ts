import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

export const addCustomSelectControl = <T, K extends keyof T>(
  gui: GUI,
  object: T,
  property: K,
  name: string,
  options: ReadonlyArray<T[K]> | Record<string, T[K]>,
  changeHandler: (value: string) => void
) => {
  gui.add(object, property, options).name(name);
  gui.onChange((evt) => changeHandler(evt.value as string));
};
