import type { JSHandle, Page } from "@playwright/test";
import type { RootState } from "@react-three/fiber";
import { ObjectLocator } from "./objectLocator";
import { ObjectLocatorApi } from "./locatorApi";
import { ObjectLocatorContext } from "./locatorContext";

export class SceneLocator implements ObjectLocatorApi, ObjectLocatorContext {
  page: Page;
  threeHandle: JSHandle<RootState> | undefined;
  _filter: LocatorFilter = {};
  _options: LocatorOptions = {};

  constructor(page: Page) {
    this.page = page;
  }

  /** @inheritdoc */
  getByName(name: string, options?: LocatorOptions): ObjectLocator {
    return new ObjectLocator(this, options).filter({ name });
  }

  /** @inheritdoc */
  getByType(type: string, options?: LocatorOptions): ObjectLocator {
    return new ObjectLocator(this, options).filter({ type });
  }

  /** @inheritdoc */
  getByUserData<T>(key: string, value: T, options?: LocatorOptions): ObjectLocator {
    return new ObjectLocator(this, options).filter({
      userData: { [key]: value },
    });
  }

  _locatorData(): SceneLocatorData {
    return {
      type: "object",
      objectType: "scene",
    };
  }

  _page(): Page {
    return this.page;
  }
}
