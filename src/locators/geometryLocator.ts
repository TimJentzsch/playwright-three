import { JSHandle, Page } from "@playwright/test";
import { ObjectLocatorContext } from "./locatorContext";
import { BufferGeometry } from "three";

export class GeometryLocator {
  ctx: ObjectLocatorContext;

  constructor(ctx: ObjectLocatorContext) {
    this.ctx = ctx;
  }

  async handle<Geometry = BufferGeometry>(): Promise<JSHandle<Geometry | undefined>> {
    return await this._page().evaluateHandle<
      Geometry | undefined,
      { locatorData: GeometryLocatorData }
    >(
      ({ locatorData }) => {
        return applyGeometryLocator(locatorData);
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
