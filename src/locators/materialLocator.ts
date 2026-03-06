import { Page } from "@playwright/test";
import { ObjectLocatorContext } from "./locatorContext";

export class MaterialLocator {
  ctx: ObjectLocatorContext;

  constructor(ctx: ObjectLocatorContext) {
    this.ctx = ctx;
  }

  _locatorData(): LocatorData {
    return {
      type: "material",
      context: this.ctx._locatorData(),
    };
  }

  _page(): Page {
    return this.ctx._page();
  }
}
