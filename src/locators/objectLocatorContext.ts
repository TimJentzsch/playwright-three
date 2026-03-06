/**
 * @import { ObjectGenerator } from "./preload/objectGenerators";
 */

import { Page } from "@playwright/test";

export interface ObjectLocatorContext {
  _locatorData(): ObjectLocatorData;

  _page(): Page;
}
