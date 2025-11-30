import type { JSHandle } from "@playwright/test";
import type { RootState } from "@react-three/fiber";
import { ThreeLocator } from "./locator";
import { ObjectLocatorApi } from "./locatorApi";
import { Object3D } from "three";
import { LocatorContext } from "./locatorContext";
import { single } from "./objectGenerators";

export class Scene implements ObjectLocatorApi, LocatorContext {
  threeHandle: JSHandle<RootState>;

  constructor(threeHandle: JSHandle<RootState>) {
    this.threeHandle = threeHandle;
  }

  /** @inheritdoc */
  getByName(name: string): ThreeLocator {
    return new ThreeLocator(this).filter({ name });
  }

  /** @inheritdoc */
  getByType(type: string): ThreeLocator {
    return new ThreeLocator(this).filter({ type });
  }

  /** @inheritdoc */
  getByUserData<T>(key: string, value: T): ThreeLocator {
    return new ThreeLocator(this).filter({ userData: { [key]: value } });
  }

  async roots(): Promise<Generator<Object3D>> {
    const scene = await this.threeHandle.evaluate((state) => state.scene);

    return single(scene);
  }
}
