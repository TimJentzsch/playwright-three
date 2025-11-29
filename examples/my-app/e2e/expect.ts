/* eslint-disable react-hooks/rules-of-hooks */
import {
  test as base,
  expect as baseExpect,
  JSHandle,
  MatcherReturnType,
} from "@playwright/test";
import { RootState } from "@react-three/fiber";
import { ThreeLocator } from "./locator";
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

export const expect = baseExpect.extend({
  async toBeVisibleInScene(locator: ThreeLocator): Promise<MatcherReturnType> {
    const object = await locator.evaluate();
    if (object === undefined) {
      return {
        pass: false,
        message: () =>
          `Expected to find object in scene, but none was found matching the locator criteria.`,
      };
    }

    const isVisible = object.visible;

    if (!isVisible) {
      return {
        pass: false,
        message: () =>
          `Expected object "${object.name}" to be visible in scene, but it is not.`,
      };
    }

    return {
      pass: true,
      message: () =>
        `Expected object "${object.name}" not to be visible in scene, but it is.`,
    };
  },

  async toHaveCountInScene(
    locator: ThreeLocator,
    expectedCount: number
  ): Promise<MatcherReturnType> {
    const objects = await locator.evaluateAll();
    const actualCount = objects.length;

    if (actualCount !== expectedCount) {
      return {
        pass: false,
        message: () =>
          `Expected to find ${expectedCount} objects in scene, but found ${actualCount}.`,
      };
    }

    return {
      pass: true,
      message: () =>
        `Expected not to find ${expectedCount} objects in scene, but found ${actualCount}.`,
    };
  },
});
