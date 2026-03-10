import { expect, test } from "@timjen/playwright-three";
import { COUNT_ROUTE } from "./Count";

test.beforeEach(async ({ page }) => {
  await page.goto(COUNT_ROUTE);
});

test("has 30 points", async ({ scene }) => {
  await expect(scene.getByType("Point")).toHaveCountInScene(30);
});
