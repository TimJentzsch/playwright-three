import { ThreeLocator } from "./locator";

export class Scene {
  getByName(name: string): ThreeLocator {
    return new ThreeLocator().withName(name);
  }
}
