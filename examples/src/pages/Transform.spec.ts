import { test, expect } from "@timjen/playwright-three";
import { Vector3 } from "three";
import { TRANSFORM_ROUTE } from "./Transform";

test.beforeEach(async ({ page }) => {
  await page.goto(TRANSFORM_ROUTE);
});

test("matches position", async ({ scene }) => {
  await expect(scene.getByType("Mesh")).toHavePosition(new Vector3(1, -2, 3));
});
