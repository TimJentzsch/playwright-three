import { JSHandle, Page } from "@playwright/test";
import { ObjectLocatorContext } from "./objectLocatorContext";
import { BufferGeometry } from "three";

export class GeometryLocator {
  ctx: ObjectLocatorContext;

  constructor(ctx: ObjectLocatorContext) {
    this.ctx = ctx;
  }

  /**
   * @returns A handle to access the material of the first object matching the locator.
   */
  async handle<Geometry = BufferGeometry>(): Promise<JSHandle<Geometry | undefined>> {
    return await this._page().evaluateHandle<
      Geometry | undefined,
      { locatorData: GeometryLocatorData }
    >(
      ({ locatorData }) => {
        const allGeometry = [...applyGeometryLocator(locatorData)];
        return allGeometry.at(0);
      },
      {
        locatorData: this._locatorData(),
      },
    );
  }

  /**
   * @returns A handle to access the materials of all objects matching the locator.
   */
  async handleAll<Geometry = BufferGeometry>(): Promise<JSHandle<Geometry[]>> {
    return await this._page().evaluateHandle<Geometry[], { locatorData: GeometryLocatorData }>(
      ({ locatorData }) => {
        return [...applyGeometryLocator(locatorData)];
      },
      {
        locatorData: this._locatorData(),
      },
    );
  }

  _locatorData(): GeometryLocatorData {
    return {
      type: "geometry",
      context: this.ctx._locatorData(),
    };
  }

  _page(): Page {
    return this.ctx._page();
  }
}
