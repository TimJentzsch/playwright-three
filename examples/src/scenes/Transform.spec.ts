import { test, expect } from "@timjen/playwright-three";
import { Vector3 } from "three";

test.beforeEach(async ({ page }) => {
  await page.goto("transform");
});

test("matches position", async ({ scene }) => {
  await expect(scene.getByType("Mesh")).toHavePosition(new Vector3(1, -2, 3));
});
