import { test, expect } from "@timjen/playwright-three";

test.beforeEach(async ({ page }) => {
  await page.goto("box");
});

test("has canvas", async ({ page }) => {
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("has mesh", async ({ scene }) => {
  await expect(scene.getByType("Mesh")).toBeVisibleInScene();
});

test("has box", async ({ scene }) => {
  await expect(scene.getByName("box")).toBeVisibleInScene();
});
