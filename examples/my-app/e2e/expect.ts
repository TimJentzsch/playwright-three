import { test as base, JSHandle } from "@playwright/test";
import { RootState } from "@react-three/fiber";

type ThreeWindow = Window & {
  PLAYWRIGHT_THREE?: RootState;
};

type ThreeFixtures = {
  threeHandle: JSHandle<RootState>;
};

export const test = base.extend<ThreeFixtures>({
  threeHandle: async ({ page }, use) => {
    await page.waitForFunction(
      () => (window as ThreeWindow).PLAYWRIGHT_THREE !== undefined
    );
    const threeHandle = await page.evaluateHandle<RootState>(
      (): RootState => (window as ThreeWindow).PLAYWRIGHT_THREE as RootState
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(threeHandle);
  },
});
export { expect } from "@playwright/test";
