import { test, expect } from "@timjen/playwright-three";
import { BoxGeometry, MeshStandardMaterial } from "three";
import { HANDLES_ROUTE } from "./Handles";

test.beforeEach(async ({ page }) => {
  await page.goto(HANDLES_ROUTE);
});

test("object handle", async ({ scene }) => {
  const object = scene.getByName("box");
  await expect(object).toBeVisibleInScene();

  const handle = await object.handle();
  const name = await handle.evaluate((object) => object?.name);
  expect(name).toBe("box");
});

test("geometry handle", async ({ scene }) => {
  const object = scene.getByName("box");
  await expect(object).toBeVisibleInScene();

  const handle = await object.geometry().handle<BoxGeometry>();
  const vertexCount = await handle.evaluate((geometry) => geometry?.getAttribute("position").count);
  // 4 vertexes per face, 6 faces
  expect(vertexCount).toBe(24);
});

test("material handle", async ({ scene }) => {
  const object = scene.getByName("box");
  await expect(object).toBeVisibleInScene();

  const handle = await object.material().handle<MeshStandardMaterial>();
  const opacity = await handle.evaluate((material) => material?.opacity);
  expect(opacity).toBeCloseTo(0.5);
});
