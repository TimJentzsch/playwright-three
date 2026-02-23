/**
 * @import { ObjectGenerator } from "./preload/objectGenerators";
 */

export interface LocatorContext {
  roots(): Promise<ObjectGenerator>;
}
