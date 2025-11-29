import type { JSHandle } from "@playwright/test";
import type { RootState } from "@react-three/fiber";
import { ThreeLocator } from "./locator";

export class Scene {
  threeHandle: JSHandle<RootState>;

  constructor(threeHandle: JSHandle<RootState>) {
    this.threeHandle = threeHandle;
  }

  getByName(name: string): ThreeLocator {
    return new ThreeLocator(this.threeHandle).getByName(name);
  }

  getByType(type: string): ThreeLocator {
    return new ThreeLocator(this.threeHandle).getByType(type);
  }
}
