import { test, expect } from "@timjen/playwright-three";
import { COLOR_ROUTE } from "./Color";

test.beforeEach(async ({ page }) => {
  await page.goto(COLOR_ROUTE);
});

test("red box is red", async ({ scene }) => {
  await expect(scene.getByName("red")).toHaveColor("#ff0000");
});

test("almost green box is green", async ({ scene }) => {
  await expect(scene.getByName("almost-green")).toHaveColor("#00ff00");
});
