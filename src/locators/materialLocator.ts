import { JSHandle, Page } from "@playwright/test";
import { ObjectLocatorContext } from "./objectLocatorContext";
import { Material } from "three";

export class MaterialLocator {
  ctx: ObjectLocatorContext;

  constructor(ctx: ObjectLocatorContext) {
    this.ctx = ctx;
  }

  /**
   * @returns A handle to access the material of the first object matching the locator.
   */
  async handle<Mat = Material>(): Promise<JSHandle<Mat | undefined>> {
    return await this._page().evaluateHandle<Mat | undefined, { locatorData: MaterialLocatorData }>(
      ({ locatorData }) => {
        const allMaterials = [...applyMaterialLocator(locatorData)];
        return allMaterials.at(0);
      },
      {
        locatorData: this._locatorData(),
      },
    );
  }

  /**
   * @returns A handle to access the materials of all objects matching the locator.
   */
  async handleAll<Mat = Material>(): Promise<JSHandle<Mat[]>> {
    return await this._page().evaluateHandle<Mat[], { locatorData: MaterialLocatorData }>(
      ({ locatorData }) => {
        return [...applyMaterialLocator(locatorData)];
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
