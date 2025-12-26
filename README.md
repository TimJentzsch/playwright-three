# playwright-three

[![NPM Version](https://img.shields.io/npm/v/%40timjen%2Fplaywright-three)](https://www.npmjs.com/package/@timjen/playwright-three)
![NPM License](https://img.shields.io/npm/l/%40timjen%2Fplaywright-three)

More reliable and convenient testing of your Three JS / React Three Fibre scenes with Playwright.

## Motivation

Playwright provides a lot of useful locators and matchers to navigate through a web page and verify behavior similar to a human.

However, this falls apart when you use Three JS / React Three Fibre:
For the browser, it's just a canvas with some pixels on it,
it loses all information of the scene and the objects within it.

Thus, you're pretty much stuck with screenshot testing, which is slow and unreliable.
Additionally, you don't get many neat features that Playwright provides, like automatic waiting for higher test stability.

`playwright-three` solves this issue by providing a similar interface as the usual Playwright assertions to Three JS scenes.

## Installation

Add the dev dependency to your project:

```sh
npm add --save-dev @timjen/playwright-three
```

You also need to expose the Three JS state on the `window` object to make it accessible from Playwright.

## Usage

Import the `test` and `expect` functions from `@timjen/playwright-three` instead of Playwright.
They retain the original functionality, but are extended for use with Three JS scenes.

You can then use the `scene` fixture to find objects in your Scene:

```ts
import { expect, test } from "@timjen/playwright-three";

test("has 30 points", async ({ scene }) => {
  await expect(scene.getByType("Point")).toHaveCountInScene(30);
});
```

Similar to most Playwright matchers, the assertion will be retired until a timeout is reached, to improve test stability.
