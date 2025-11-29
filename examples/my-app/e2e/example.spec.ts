import { expect, test } from "@timjen/playwright-three";

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

test("has mesh", async ({ scene }) => {
  await expect(scene.getByType("Mesh")).toBeVisibleInScene();
});

test("has box", async ({ scene }) => {
  await expect(scene.getByName("box")).toBeVisibleInScene();
});

test("has 20 points", async ({ scene }) => {
  await expect(scene.getByType("Point")).toHaveCountInScene(20);
});
