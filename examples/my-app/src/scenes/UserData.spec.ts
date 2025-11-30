import { expect, test } from "@timjen/playwright-three";

test.beforeEach(async ({ page }) => {
  await page.goto("userData");
});

test("identifies object by user ID", async ({ scene }) => {
  await expect(scene.getByUserData("id", 1)).toBeVisibleInScene();
});

test("identifies object by user shape", async ({ scene }) => {
  await expect(scene.getByUserData("shape", "sphere")).toHaveCountInScene(2);
});
