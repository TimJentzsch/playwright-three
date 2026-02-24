import type { JSHandle, Page } from "@playwright/test";
import type { RootState } from "@react-three/fiber";
import { ThreeLocator } from "./locator";
import { ObjectLocatorApi } from "./locatorApi";
import { LocatorContext } from "./locatorContext";

export class Scene implements ObjectLocatorApi, LocatorContext {
  page: Page;
  threeHandle: JSHandle<RootState> | undefined;
  _filter: LocatorFilter = {};
  _options: LocatorOptions = {};

  constructor(page: Page) {
    this.page = page;
  }

  /** @inheritdoc */
  getByName(name: string, options?: LocatorOptions): ThreeLocator {
    return new ThreeLocator(this, options).filter({ name });
  }

  /** @inheritdoc */
  getByType(type: string, options?: LocatorOptions): ThreeLocator {
    return new ThreeLocator(this, options).filter({ type });
  }

  /** @inheritdoc */
  getByUserData<T>(key: string, value: T, options?: LocatorOptions): ThreeLocator {
    return new ThreeLocator(this, options).filter({
      userData: { [key]: value },
    });
  }

  _locatorData(): undefined {
    return undefined;
  }

  _page(): Page {
    return this.page;
  }
}
