import { test, expect } from "@playwright/test";
import { type RootState } from "@react-three/fiber";

type ThreeWindow = Window & {
  PLAYWRIGHT_THREE?: RootState;
};

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("has canvas", async ({ page }) => {
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("has camera", async ({ page }) => {
  await page.waitForFunction(
    () => (window as ThreeWindow).PLAYWRIGHT_THREE !== undefined
  );
  const stateHandle = await page.evaluateHandle<RootState>(
    (): RootState => (window as ThreeWindow).PLAYWRIGHT_THREE as RootState
  );

  const cameraId = await stateHandle.evaluate((state) => state.camera.id);
  expect(cameraId).not.toBeUndefined();
});
