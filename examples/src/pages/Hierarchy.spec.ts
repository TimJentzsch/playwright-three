import { test, expect } from "@timjen/playwright-three";
import { HIERARCHY_ROUTE } from "./Hierarchy";

test.beforeEach(async ({ page }) => {
  await page.goto(HIERARCHY_ROUTE);
});

test("top level", async ({ scene }) => {
  await expect(
    scene.getByType("Group", {
      maxDepth: 1,
    }),
  ).toHaveCountInScene(1);
});

test("nested access", async ({ scene }) => {
  // All groups within "1.1" > "1.1.1", "1.1.2", "1.1.3"
  await expect(scene.getByName("1.1").getByType("Group")).toHaveCountInScene(3);
});
