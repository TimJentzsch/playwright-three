import { test as base, JSHandle } from "@playwright/test";
import { RootState } from "@react-three/fiber";
import { Scene } from "./scene";

type ThreeWindow = Window & {
  PLAYWRIGHT_THREE?: RootState;
};

type ThreeFixtures = {
  threeHandle: JSHandle<RootState>;

  scene: Scene;
};

export const test = base.extend<ThreeFixtures>({
  threeHandle: async ({ page }, use) => {
    await page.waitForFunction(
      () => (window as ThreeWindow).PLAYWRIGHT_THREE !== undefined
    );
    const threeHandle = await page.evaluateHandle<RootState>(
      (): RootState => (window as ThreeWindow).PLAYWRIGHT_THREE as RootState
    );

    await use(threeHandle);
  },

  scene: async ({ threeHandle }, use) => {
    const scene = new Scene(threeHandle);
    await use(scene);
  },
});
