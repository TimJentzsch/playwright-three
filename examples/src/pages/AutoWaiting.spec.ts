import { expect, test } from "@timjen/playwright-three";
import { AUTO_WAITING_ROUTE } from "./AutoWaiting";

test.beforeEach(async ({ page }) => {
  await page.goto(AUTO_WAITING_ROUTE);
});

test("has 10 points after loading", async ({ scene }) => {
  await expect(scene.getByType("Point")).toHaveCountInScene(10);
});
