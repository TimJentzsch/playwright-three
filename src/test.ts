import {
  test as base,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from "@playwright/test";
import { Scene } from "./scene";

const objectGeneratorsPath = new URL("./preload/objectGenerators.js", import.meta.url).pathname;

type ThreeTestFixtures = {
  scene: Scene;

  autoLoadSceneScripts: "autoLoadSceneScripts";
};

export const test: TestType<
  PlaywrightTestArgs & PlaywrightTestOptions & ThreeTestFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = base.extend<ThreeTestFixtures>({
  autoLoadSceneScripts: [
    async ({ page }, use) => {
      await page.addInitScript({
        path: objectGeneratorsPath,
      });

      use("autoLoadSceneScripts");
    },
    { scope: "test", auto: true },
  ],

  scene: async ({ page }, use) => {
    const scene = new Scene(page);
    await use(scene);
  },
});
