import { test, expect } from "@timjen/playwright-three";

test.beforeEach(async ({ page }) => {
  await page.goto("locatorOptions");
});

test("has 0 boxes at depth 1", async ({ scene }) => {
  // Only groups at that level
  expect(scene.getByName("box", { maxDepth: 1 })).toHaveCountInScene(0);
});

test("has 1 box at depth 2", async ({ scene }) => {
  expect(scene.getByName("box", { maxDepth: 2 })).toHaveCountInScene(1);
});

test("has 3 boxes at depth 3", async ({ scene }) => {
  expect(scene.getByName("box", { maxDepth: 3 })).toHaveCountInScene(3);
});

test("has 3 boxes at unlimited depth", async ({ scene }) => {
  expect(scene.getByName("box")).toHaveCountInScene(3);
});
