/* eslint-disable react-hooks/rules-of-hooks */
import { expect as baseExpect, MatcherReturnType } from "@playwright/test";
import { ThreeLocator } from "./locator";

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
        message: () => `Expected object "${object.name}" to be visible in scene, but it is not.`,
      };
    }

    return {
      pass: true,
      message: () => `Expected object "${object.name}" not to be visible in scene, but it is.`,
    };
  },

  async toHaveCountInScene(
    locator: ThreeLocator,
    expectedCount: number,
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
