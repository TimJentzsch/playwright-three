import type { JSHandle } from "@playwright/test";
import type { RootState } from "@react-three/fiber";
import { ThreeLocator } from "./locator";
import { ObjectLocatorApi } from "./locatorApi";

export class Scene implements ObjectLocatorApi {
  threeHandle: JSHandle<RootState>;

  constructor(threeHandle: JSHandle<RootState>) {
    this.threeHandle = threeHandle;
  }

  /** @inheritdoc */
  getByName(name: string): ThreeLocator {
    return new ThreeLocator(this.threeHandle).getByName(name);
  }

  /** @inheritdoc */
  getByType(type: string): ThreeLocator {
    return new ThreeLocator(this.threeHandle).getByType(type);
  }

  /** @inheritdoc */
  getByUserData<T>(key: string, value: T): ThreeLocator {
    return new ThreeLocator(this.threeHandle).getByUserData(key, value);
  }
}
