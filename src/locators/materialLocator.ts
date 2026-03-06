import { JSHandle, Page } from "@playwright/test";
import { ObjectLocatorContext } from "./objectLocatorContext";
import { Material } from "three";

export class MaterialLocator {
  ctx: ObjectLocatorContext;

  constructor(ctx: ObjectLocatorContext) {
    this.ctx = ctx;
  }

  async handle<Mat = Material>(): Promise<JSHandle<Mat | undefined>> {
    return await this._page().evaluateHandle<Mat | undefined, { locatorData: MaterialLocatorData }>(
      ({ locatorData }) => {
        return applyMaterialLocator(locatorData);
      },
      {
        locatorData: this._locatorData(),
      },
    );
  }

  _locatorData(): MaterialLocatorData {
    return {
      type: "material",
      context: this.ctx._locatorData(),
    };
  }

  _page(): Page {
    return this.ctx._page();
  }
}
