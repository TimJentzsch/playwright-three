import { expect, test } from "@timjen/playwright-three";

test.beforeEach(async ({ page }) => {
  await page.goto("count");
});

test("has 30 points", async ({ scene }) => {
  await expect(scene.getByType("Point")).toHaveCountInScene(30);
});
