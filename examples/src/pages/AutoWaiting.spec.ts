import { expect, test } from "@timjen/playwright-three";

test.beforeEach(async ({ page }) => {
  await page.goto("loadingPoints");
});

test("has 10 points after loading", async ({ scene }) => {
  await expect(scene.getByType("Point")).toHaveCountInScene(10);
});
