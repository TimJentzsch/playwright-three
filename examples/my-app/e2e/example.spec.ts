import { Object3D } from "three";
import { expect, test } from "./expect";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("has canvas", async ({ page }) => {
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("has camera", async ({ threeHandle }) => {
  const cameraId = await threeHandle.evaluate((state) => state.camera.id);
  expect(cameraId).not.toBeUndefined();
});

test("has mesh", async ({ threeHandle }) => {
  const objects = await threeHandle.evaluate((state) => {
    const objects: Object3D[] = [];
    state.scene.traverse((obj) => {
      if (obj.type === "Mesh") {
        objects.push(obj);
      }
    });
    return objects;
  });

  expect(objects).toHaveLength(1);
});

test("has box", async ({ threeHandle }) => {
  const box = await threeHandle.evaluate((state) => {
    return state.scene.getObjectByName("box");
  });

  expect(box).toBeDefined();
});
