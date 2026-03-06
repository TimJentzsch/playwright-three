import { Page } from "@playwright/test";
import { ObjectLocatorApi } from "./locatorApi";
import { LocatorContext } from "./locatorContext";

/**
 * @import { ObjectGenerator } from "./preload/objectGenerators";
 * @import { LocatorFilter, LocatorOptions } from "./preload/applyLocator";
 */

export class ObjectLocator implements ObjectLocatorApi, LocatorContext {
  ctx: LocatorContext;
  _filter: LocatorFilter = {};
  _options: LocatorOptions = {};

  constructor(ctx: LocatorContext, options: LocatorOptions = {}) {
    this.ctx = ctx;
    this._options = options;
  }

  /**
   * @param filter Filter the objects by the conditions.
   * @returns The locator for chaining
   */
  filter(filter: LocatorFilter): ObjectLocator {
    this._filter = {
      ...this._filter,
      ...filter,
    };

    return this;
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

  _locatorData(): LocatorData {
    return {
      context: this.ctx._locatorData(),
      filter: this._filter,
      options: this._options,
    };
  }

  _page(): Page {
    return this.ctx._page();
  }
}
