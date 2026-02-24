import { ObjectLocatorApi } from "./locatorApi";
import { LocatorContext } from "./locatorContext";

/**
 * @import { ObjectGenerator } from "./preload/objectGenerators";
 * @import { LocatorFilter, LocatorOptions } from "./preload/applyLocator";
 */

export class ThreeLocator implements ObjectLocatorApi, LocatorContext {
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
  filter(filter: LocatorFilter): ThreeLocator {
    this._filter = {
      ...this._filter,
      ...filter,
    };

    return this;
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

  _locatorData(): LocatorData {
    return {
      context: this.ctx._locatorData(),
      filter: this._filter,
      options: this._options,
    };
  }
}
