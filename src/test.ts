import {
  test as base,
  JSHandle,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from "@playwright/test";
import { RootState } from "@react-three/fiber";
import { Scene } from "./scene";

type ThreeFixtures = {
  threeHandle: JSHandle<RootState>;

  scene: Scene;
};

export const test: TestType<
  PlaywrightTestArgs & PlaywrightTestOptions & ThreeFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = base.extend<ThreeFixtures>({
  scene: async ({ page }, use) => {
    const scene = new Scene(page);
    await use(scene);
  },
});
