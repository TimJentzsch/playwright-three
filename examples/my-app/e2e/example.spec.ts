import { expect, test } from "./expect";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("has canvas", async ({ page }) => {
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("has camera", async ({ threeHandle }) => {
  const cameraId = await threeHandle.evaluate((state) => state.camera.id);
  expect(cameraId).not.toBeUndefined();
});
