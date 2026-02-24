/**
 * @import { ObjectGenerator } from "./preload/objectGenerators";
 */

import { Page } from "@playwright/test";

export interface LocatorContext {
  _locatorData(): LocatorData | undefined;

  _page(): Page;
}
