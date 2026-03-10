import { test, expect } from "@timjen/playwright-three";
import { NAME_AND_TYPE_ROUTE } from "./NameAndType";

test.beforeEach(async ({ page }) => {
  await page.goto(NAME_AND_TYPE_ROUTE);
});

test("access by type", async ({ scene }) => {
  await expect(scene.getByType("Mesh")).toBeVisibleInScene();
});

test("access by name", async ({ scene }) => {
  await expect(scene.getByName("box")).toBeVisibleInScene();
});
