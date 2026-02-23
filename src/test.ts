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

const objectGeneratorsPath = new URL("./preload/objectGenerators.js", import.meta.url).pathname;

type ThreeFixtures = {
  threeHandle: JSHandle<RootState>;

  scene: Scene;
};

export const test: TestType<
  PlaywrightTestArgs & PlaywrightTestOptions & ThreeFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = base.extend<ThreeFixtures>({
  scene: async ({ page }, use) => {
    await page.addInitScript({
      path: objectGeneratorsPath,
    });
    // Ensure that the init script is available
    await page.reload();
    const scene = new Scene(page);
    await use(scene);
  },
});
