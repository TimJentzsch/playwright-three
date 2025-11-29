import { JSHandle } from "@playwright/test";
import { RootState } from "@react-three/fiber";
import { Object3D } from "three";

export class ThreeLocator {
  threeHandle: JSHandle<RootState>;
  name?: string;
  type?: string;

  constructor(threeHandle: JSHandle<RootState>) {
    this.threeHandle = threeHandle;
  }

  getByName(name: string): ThreeLocator {
    this.name = name;
    return this;
  }

  getByType(type: string): ThreeLocator {
    this.type = type;
    return this;
  }

  async evaluateAll(): Promise<Object3D[]> {
    return await this.threeHandle.evaluate((three) => {
      const results: Object3D[] = [];
      three.scene.traverse((obj) => {
        if (this.name !== undefined && obj.name !== this.name) return;
        if (this.type !== undefined && obj.type !== this.type) return;
        results.push(obj);
      });
      return results;
    });
  }

  async evaluate(): Promise<Object3D | undefined> {
    const results = await this.evaluateAll();
    return results.at(0);
  }
}
