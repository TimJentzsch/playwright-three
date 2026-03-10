import { test, expect } from "@timjen/playwright-three";

test.beforeEach(async ({ page }) => {
  await page.goto("box");
});

test("access by type", async ({ scene }) => {
  await expect(scene.getByType("Mesh")).toBeVisibleInScene();
});

test("access by name", async ({ scene }) => {
  await expect(scene.getByName("box")).toBeVisibleInScene();
});
