/* eslint-disable react-hooks/rules-of-hooks */
import {
  expect as baseExpect,
  Expect,
  ExpectMatcherState,
  MatcherReturnType,
} from "@playwright/test";
import { ObjectLocator } from "./locators/objectLocator";
import { Color, Vector3 } from "three";
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
    locator: ObjectLocator,
    options?: CommonOptions,
  ): Promise<MatcherReturnType>;

  /**
   * Expect the object to be close to the provided position.
   */
  toHavePosition(
    this: ExpectMatcherState,
    /** The locator, must match a single object. */
    locator: ObjectLocator,
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
    locator: ObjectLocator,
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
    locator: ObjectLocator,
    /** The expected number of objects that the locator must match. */
    expectedCount: number,
    options?: CommonOptions,
  ): Promise<MatcherReturnType>;
}> = baseExpect.extend({
  async toBeVisibleInScene(locator, options = {}): Promise<MatcherReturnType> {
    return waitForLocatorSingle(
      locator,
      {
        isVisible: true,
      },
      ({ isVisible }) => {
        if (isVisible) {
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
    return waitForLocatorSingle(
      locator,
      {
        position: true,
      },
      ({ position: positionArray }) => {
        if (!positionArray) throw new Error("unreachable: requested position data not provided");

        const position = new Vector3().fromArray(positionArray);

        if (expected.distanceTo(position) > precision) {
          return {
            pass: false,
            expected,
            actual: positionArray,
            message: () => `Position doesn't match the expected one.`,
          };
        } else {
          return {
            pass: true,
            message: () => `Position matches the provided one, even though it should not.`,
          };
        }
      },
    );
  },

  async toHaveColor(
    locator,
    expected,
    { precision = 1, timeout } = {},
  ): Promise<MatcherReturnType> {
    return waitForLocatorSingle(
      locator,
      {
        material: {
          color: true,
        },
      },
      (objData) => {
        const color = objData.material?.color;

        if (color === undefined) {
          return {
            pass: false,
            message: () => `Object doesn't have a valid material color.`,
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
            actual: color,
            message: () => `The colors are visually different (ΔE = ${deltaE} > ${precision}).`,
          };
        }

        return {
          pass: true,
          actual: color,
          expected: expectedColor,
          message: () => `The colors are visually similar (ΔE = ${deltaE} ≤ ${precision}).`,
        };
      },
      { timeout },
    );
  },

  async toHaveCountInScene(locator, expectedCount, options = {}): Promise<MatcherReturnType> {
    return waitForLocator(
      locator,
      // No data needed, just the count
      {},
      (allObjectData) => {
        const actualCount = allObjectData.length;

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

async function waitForLocator(
  locator: ObjectLocator,
  objDataRequest: ObjectDataRequest,
  condition: (allObjData: ObjectData[]) => MatcherReturnType,
  { timeout = 5_000 }: CommonOptions = {},
): Promise<MatcherReturnType> {
  let curResult = {
    pass: false,
    message: () => "No objects match locator",
  };

  return Promise.race([
    sleep(timeout).then(() => curResult),

    repeatUntil(
      async () =>
        await locator._page().evaluate(
          ({ locatorData, objDataRequest }) => {
            const objects = applyLocator(locatorData);

            const objData = [];

            for (const obj of objects) {
              objData.push(getObjectData(objDataRequest)(obj));
            }

            return objData;
          },
          {
            locatorData: locator._locatorData(),
            objDataRequest,
          },
        ),
      (objData) => condition(objData),
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

async function waitForLocatorSingle(
  locator: ObjectLocator,
  objDataRequest: ObjectDataRequest,
  condition: (objData: ObjectData) => MatcherReturnType,
  options: CommonOptions = {},
): Promise<MatcherReturnType> {
  return await waitForLocator(
    locator,
    objDataRequest,
    (allObjData) => {
      const objectCount = allObjData.length;

      if (objectCount === 1) {
        return condition(allObjData[0]);
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
    options,
  );
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
