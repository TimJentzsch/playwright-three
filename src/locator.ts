import { JSHandle } from "@playwright/test";
import { RootState } from "@react-three/fiber";
import { Object3D } from "three";
import { ObjectLocatorApi } from "./locatorApi";

export class ThreeLocator implements ObjectLocatorApi {
  threeHandle: JSHandle<RootState>;
  name?: string;
  type?: string;
  userData: Record<string, unknown> = {};

  constructor(threeHandle: JSHandle<RootState>) {
    this.threeHandle = threeHandle;
  }

  /** @inheritdoc */
  getByName(name: string): ThreeLocator {
    this.name = name;
    return this;
  }

  /** @inheritdoc */
  getByType(type: string): ThreeLocator {
    this.type = type;
    return this;
  }

  /** @inheritdoc */
  getByUserData<T>(key: string, value: T): ThreeLocator {
    this.userData[key] = value;
    return this;
  }

  async evaluateAll(): Promise<Object3D[]> {
    return await this.threeHandle.evaluate(
      (three, { name, type, userData }) => {
        const results: Object3D[] = [];
        three.scene.traverse((obj) => {
          if (name !== undefined && obj.name !== name) return;
          if (type !== undefined && obj.type !== type) return;
          for (const [key, value] of Object.entries(userData)) {
            if (obj.userData[key] !== value) return;
          }
          results.push(obj);
        });
        return results;
      },
      this
    );
  }

  async evaluate(): Promise<Object3D | undefined> {
    const results = await this.evaluateAll();
    return results.at(0);
  }
}
