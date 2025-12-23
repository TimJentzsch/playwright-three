/* eslint-disable react-hooks/rules-of-hooks */
import { expect as baseExpect, MatcherReturnType } from "@playwright/test";
import { ThreeLocator } from "./locator";
import { ObjectGenerator } from "./objectGenerators";
import { Object3D } from "three";

export const expect = baseExpect.extend({
  async toBeVisibleInScene(locator: ThreeLocator): Promise<MatcherReturnType> {
    return waitForObject(locator, (object) => {
      if (object.visible) {
        return {
          pass: true,
          message: () => `Expected object to not be visible, but it is.`,
        };
      } else {
        return {
          pass: false,
          message: () => `Expected object to be visible, but it's not.`,
        };
      }
    });
  },

  async toHaveCountInScene(
    locator: ThreeLocator,
    expectedCount: number
  ): Promise<MatcherReturnType> {
    return waitForObjects(locator, (objects) => {
      const actualCount = [...objects].length;

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
  condition: (objects: ObjectGenerator) => MatcherReturnType,
  timeout: number = 5_000
): Promise<MatcherReturnType> {
  let curResult = {
    pass: false,
    message: () => "No objects match locator",
  };

  return Promise.race([
    sleep(timeout).then(() => curResult),

    repeatUntil(
      () => locator.evaluate(),
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

async function waitForObject(
  locator: ThreeLocator,
  condition: (object: Object3D) => MatcherReturnType,
  timeout: number = 5_000
): Promise<MatcherReturnType> {
  let curResult = {
    pass: false,
    message: () => "No objects match locator",
  };

  return Promise.race([
    sleep(timeout).then(() => curResult),

    repeatUntil(
      () => locator.evaluate(),
      (objects) => {
        const allObjects = [...objects];
        const objectCount = allObjects.length;

        if (objectCount === 1) {
          return condition(allObjects[0]);
        } else if (objectCount === 0) {
          return {
            pass: false,
            message: () => "No objects match locator",
          };
        } else {
          return {
            pass: false,
            message: () =>
              `${objectCount} match locator, but expected exactly one`,
          };
        }
      },
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

    await sleep(delay);
  }
}
