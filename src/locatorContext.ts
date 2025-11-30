import { ObjectGenerator } from "./objectGenerators";

export interface LocatorContext {
  roots(): Promise<ObjectGenerator>;
}
