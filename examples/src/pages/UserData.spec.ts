import { expect, test } from "@timjen/playwright-three";
import { USER_DATA_ROUTE } from "./UserData";

test.beforeEach(async ({ page }) => {
  await page.goto(USER_DATA_ROUTE);
});

test("identifies object by user ID", async ({ scene }) => {
  await expect(scene.getByUserData("id", 1)).toBeVisibleInScene();
});

test("identifies object by user shape", async ({ scene }) => {
  await expect(scene.getByUserData("shape", "sphere")).toHaveCountInScene(2);
});
