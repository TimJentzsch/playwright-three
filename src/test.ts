import {
  test as base,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from "@playwright/test";
import { SceneLocator } from "./locators/sceneLocator";

const initScripts = ["applyLocator", "objectData", "objectGenerators"];

type ThreeTestFixtures = {
  scene: SceneLocator;

  autoLoadSceneScripts: "autoLoadSceneScripts";
};

export const test: TestType<
  PlaywrightTestArgs & PlaywrightTestOptions & ThreeTestFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = base.extend<ThreeTestFixtures>({
  autoLoadSceneScripts: [
    async ({ page }, use) => {
      await Promise.all(
        initScripts.map(async (scriptName) => {
          const path = new URL(`./preload/${scriptName}.js`, import.meta.url).pathname;
          return await page.addInitScript({
            path,
          });
        }),
      );

      use("autoLoadSceneScripts");
    },
    { scope: "test", auto: true },
  ],

  scene: async ({ page }, use) => {
    const scene = new SceneLocator(page);
    await use(scene);
  },
});
