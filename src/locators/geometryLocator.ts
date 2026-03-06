import { Page } from "@playwright/test";
import { ObjectLocatorContext } from "./locatorContext";

export class GeometryLocator {
  ctx: ObjectLocatorContext;

  constructor(ctx: ObjectLocatorContext) {
    this.ctx = ctx;
  }

  _locatorData(): LocatorData {
    return {
      type: "geometry",
      context: this.ctx._locatorData(),
    };
  }

  _page(): Page {
    return this.ctx._page();
  }
}
