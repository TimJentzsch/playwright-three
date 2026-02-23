/* eslint-disable react-hooks/rules-of-hooks */
import {
  expect as baseExpect,
  Expect,
  ExpectMatcherState,
  MatcherReturnType,
} from "@playwright/test";
import { ThreeLocator } from "./locator";
import { Color, Mesh, Object3D, Vector3 } from "three";
import ColorJs from "colorjs.io";

const PRECISION = 0.001;

type CommonOptions = {
  /** How long to wait until the condition has to be reached (in ms). */
  timeout?: number;
};

export const expect: Expect<{
  /**
   * Expect the locator to match a single object, that is visible in the scene.
   */
  toBeVisibleInScene(
    this: ExpectMatcherState,
    /** The locator, must match a single object. */
    locator: ThreeLocator,
    options?: CommonOptions,
  ): Promise<MatcherReturnType>;

  /**
   * Expect the object to be close to the provided position.
   */
  toHavePosition(
    this: ExpectMatcherState,
    /** The locator, must match a single object. */
    locator: ThreeLocator,
    /** The expected position of the object. */
    expected: Vector3,
    options?: CommonOptions & {
      /** The maximum distance between the actual and expected position for the test to pass. */
      precision?: number;
    },
  ): Promise<MatcherReturnType>;

  /**
   * Expect the object to have a material color that is visually similar to the provided one.
   */
  toHaveColor(
    this: ExpectMatcherState,
    /** The locator, must match a single object. */
    locator: ThreeLocator,
    /** The expected color value. */
    expected: string | Color,
    options?: CommonOptions & {
      /** The maximum color difference in ΔE for the colors to be considered the same. */
      precision?: number;
    },
  ): Promise<MatcherReturnType>;

  /** Expect the locator to match `expectedCount` objects. */
  toHaveCountInScene(
    this: ExpectMatcherState,
    /** The locator for the objects to count. */
    locator: ThreeLocator,
    /** The expected number of objects that the locator must match. */
    expectedCount: number,
    options?: CommonOptions,
  ): Promise<MatcherReturnType>;
}> = baseExpect.extend({
  async toBeVisibleInScene(locator, options = {}): Promise<MatcherReturnType> {
    return waitForObject(
      locator,
      (object) => {
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
      },
      options,
    );
  },

  async toHavePosition(
    locator,
    expected,
    { precision = PRECISION } = {},
  ): Promise<MatcherReturnType> {
    return waitForObject(locator, (object) => {
      const position = object.position;

      if (expected.distanceTo(object.position) > precision) {
        return {
          pass: false,
          expected,
          actual: position,
          message: () => `Position doesn't match the expected one.`,
        };
      } else {
        return {
          pass: true,
          message: () => `Position matches the provided one, even though it should not.`,
        };
      }
    });
  },

  async toHaveColor(
    locator,
    expected,
    { precision = 1, timeout } = {},
  ): Promise<MatcherReturnType> {
    return waitForObject(
      locator,
      (object) => {
        if (!isMesh(object)) {
          console.debug([object]);
          console.debug(object);
          return {
            pass: false,
            message: () => `Object doesn't have a material.`,
          };
        }

        const material = object.material;

        if (Array.isArray(material)) {
          return {
            pass: false,
            message: () => `Object has multiple materials, which is not supported.`,
          };
        }

        const color = (material as any).color;

        if (color === undefined || color === null) {
          return {
            pass: false,
            message: () => `Material doesn't have a color.`,
          };
        }

        if (!isColor(color)) {
          return {
            pass: false,
            message: () => `Material color is not a Color instance.`,
          };
        }

        let expectedColor: ColorJs;
        if (typeof expected === "string") {
          expectedColor = new ColorJs(expected);
        } else {
          expectedColor = new ColorJs(
            `rgb(${expected.r * 255}, ${expected.g * 255}, ${expected.b * 255})`,
          );
        }

        const actualColor = new ColorJs(
          `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`,
        );
        const deltaE = actualColor.deltaE2000(expectedColor);

        if (deltaE > precision) {
          return {
            pass: false,
            expected: expectedColor,
            actual: actualColor,
            message: () => `The colors are visually different (ΔE = ${deltaE} > ${precision}).`,
          };
        }

        return {
          pass: true,
          actual: actualColor,
          expected: expectedColor,
          message: () => `The colors are visually similar (ΔE = ${deltaE} ≤ ${precision}).`,
        };
      },
      { timeout },
    );
  },

  async toHaveCountInScene(locator, expectedCount, options = {}): Promise<MatcherReturnType> {
    return waitForObjects(
      locator,
      (objects) => {
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
      },
      options,
    );
  },
});

async function waitForObjects(
  locator: ThreeLocator,
  condition: (objects: ObjectGenerator) => MatcherReturnType,
  { timeout = 5_000 }: CommonOptions = {},
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
      250,
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
  { timeout = 5_000 }: CommonOptions = {},
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
            message: () => `${objectCount} match locator, but expected exactly one`,
          };
        }
      },
      (matcherReturn) => {
        curResult = matcherReturn;
      },
      250,
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
  delay: number,
): Promise<void> {
  while (true) {
    const result = await fn();
    const conditionResult = await condition(result);
    onReturnChange(conditionResult);
    if (conditionResult.pass) return;

    await sleep(delay);
  }
}

function isMesh(object: Object3D): object is Mesh {
  return (object as any).isMesh === true;
}

function isColor(object: any): object is Color {
  return (object as any).isColor === true;
}
