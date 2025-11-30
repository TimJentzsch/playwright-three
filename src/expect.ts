/* eslint-disable react-hooks/rules-of-hooks */
import { expect as baseExpect, MatcherReturnType } from "@playwright/test";
import { ThreeLocator } from "./locator";
import { Object3D } from "three";

export const expect = baseExpect.extend({
  async toBeVisibleInScene(locator: ThreeLocator): Promise<MatcherReturnType> {
    return waitForObjects(locator, (objects) => {
      const visibleObjects = objects.filter((obj) => obj.visible);
      if (visibleObjects.length > 0) {
        return {
          pass: true,
          message: () =>
            `Expected no objects to be visible in scene, but found ${visibleObjects.length} visible object(s).`,
        };
      } else {
        return {
          pass: false,
          message: () =>
            `Expected at least one object to be visible in scene, but none were visible.`,
        };
      }
    });
  },

  async toHaveCountInScene(
    locator: ThreeLocator,
    expectedCount: number
  ): Promise<MatcherReturnType> {
    return waitForObjects(locator, (objects) => {
      const actualCount = objects.length;

      if (actualCount === expectedCount) {
        return {
          pass: true,
          message: () =>
            `Expected not to find ${expectedCount} objects in scene, but found ${actualCount}.`,
        };
      } else {
        return {
          pass: false,
          message: () =>
            `Expected to find ${expectedCount} objects in scene, but found ${actualCount}.`,
        };
      }
    });
  },
});

async function waitForObjects(
  locator: ThreeLocator,
  condition: (objects: Object3D[]) => MatcherReturnType,
  timeout: number = 5_000
): Promise<MatcherReturnType> {
  let curResult = {
    pass: false,
    message: () => "No objects match locator",
  };

  return Promise.race([
    sleep(timeout).then(() => curResult),

    repeatUntil(
      async () => {
        const objects = await locator.evaluateAll();
        return objects;
      },
      (objects) => condition(objects),
      (matcherReturn) => {
        curResult = matcherReturn;
      },
      250
    )
      .then(() => curResult)
      .catch((error: unknown) => ({
        pass: false,
        message: () => String(error),
      })),
  ]);
}

async function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

async function repeatUntil<T>(
  fn: () => Promise<T>,
  condition: (result: T) => MatcherReturnType,
  onReturnChange: (matcherReturn: MatcherReturnType) => void,
  delay: number
): Promise<void> {
  while (true) {
    const result = await fn();
    const conditionResult = await condition(result);
    onReturnChange(conditionResult);
    if (conditionResult.pass) return;

    console.debug("Condition not met, retrying...");
    await sleep(delay);
  }
}
