import { JSHandle, Page } from "@playwright/test";
import { ObjectLocatorApi } from "./objectLocatorApi";
import { ObjectLocatorContext } from "./objectLocatorContext";
import { MaterialLocator } from "./materialLocator";
import { GeometryLocator } from "./geometryLocator";
import { Object3D } from "three";

/**
 * @import { ObjectGenerator } from "./preload/objectGenerators";
 * @import { LocatorFilter, LocatorOptions } from "./preload/applyLocator";
 */

export class ObjectLocator implements ObjectLocatorApi, ObjectLocatorContext {
  ctx: ObjectLocatorContext;
  _filter: LocatorFilter = {};
  _options: LocatorOptions = {};

  constructor(ctx: ObjectLocatorContext, options: LocatorOptions = {}) {
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

  /** Access the material of the object. */
  material(): MaterialLocator {
    return new MaterialLocator(this);
  }

  /** Access the geometry of the object. */
  geometry(): GeometryLocator {
    return new GeometryLocator(this);
  }

  /**
   * @returns A handle to access the first object matching the locator.
   */
  async handle(): Promise<JSHandle<Object3D | undefined>> {
    return await this._page().evaluateHandle<
      Object3D | undefined,
      { locatorData: ObjectLocatorData }
    >(
      ({ locatorData }) => {
        const allObjects = [...applyObjectLocator(locatorData)];
        return allObjects.at(0);
      },
      {
        locatorData: this._locatorData(),
      },
    );
  }

  /**
   * @returns A handle to access all objects matching the locator.
   */
  async handleAll(): Promise<JSHandle<Object3D[]>> {
    return await this._page().evaluateHandle<Object3D[], { locatorData: ObjectLocatorData }>(
      ({ locatorData }) => {
        return [...applyObjectLocator(locatorData)];
      },
      {
        locatorData: this._locatorData(),
      },
    );
  }

  _locatorData(): ObjectLocatorData {
    return {
      type: "object",
      objectType: "generic",
      context: this.ctx._locatorData(),
      filter: this._filter,
      options: this._options,
    };
  }

  _page(): Page {
    return this.ctx._page();
  }
}
