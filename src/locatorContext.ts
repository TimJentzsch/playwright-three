/**
 * @import { ObjectGenerator } from "./preload/objectGenerators";
 */

import { JSHandle } from "@playwright/test";

export interface LocatorContext {
  roots(): Promise<JSHandle<ObjectGenerator>>;
}
