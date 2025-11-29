import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("has canvas", async ({ page }) => {
  await expect(page.locator("canvas")).toHaveCount(1);
});
