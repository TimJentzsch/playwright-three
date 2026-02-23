import { LocatorOptions, ObjectLocatorApi } from "./locatorApi";
import { LocatorContext } from "./locatorContext";
import { filtered, ObjectGenerator, traverseAll } from "./objectGenerators";

export type LocatorFilter = {
  name?: string;
  type?: string;
  userData?: Record<string, unknown>;
};

export class ThreeLocator implements ObjectLocatorApi, LocatorContext {
  ctx: LocatorContext;
  #filter: LocatorFilter = {};
  #options: LocatorOptions = {};

  constructor(ctx: LocatorContext, options: LocatorOptions = {}) {
    this.ctx = ctx;
    this.#options = options;
  }

  /**
   * @param filter Filter the objects by the conditions.
   * @returns The locator for chaining
   */
  filter(filter: LocatorFilter): ThreeLocator {
    this.#filter = {
      ...this.#filter,
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

  async roots(): Promise<ObjectGenerator> {
    return this.evaluate();
  }

  async evaluate(): Promise<ObjectGenerator> {
    const roots = await this.ctx.roots();

    return filtered(traverseAll(roots, this.#options.maxDepth ?? Infinity), (obj) => {
      const { name, type, userData } = this.#filter;

      if (name !== undefined && obj.name !== name) {
        return false;
      }

      if (type !== undefined && obj.type !== type) {
        return false;
      }

      if (userData !== undefined) {
        for (const [key, value] of Object.entries(userData)) {
          if (obj.userData[key] !== value) {
            return false;
          }
        }
      }

      return true;
    });
  }
}
