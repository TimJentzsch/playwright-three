import type { JSHandle, Page } from "@playwright/test";
import type { RootState } from "@react-three/fiber";
import { ThreeLocator } from "./locator";
import { ObjectLocatorApi } from "./locatorApi";
import { Object3D } from "three";
import { LocatorContext } from "./locatorContext";
import { single } from "./objectGenerators";

type ThreeWindow = Window & {
  PLAYWRIGHT_THREE?: RootState;
};

export class Scene implements ObjectLocatorApi, LocatorContext {
  page: Page;
  threeHandle: JSHandle<RootState> | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  /** @inheritdoc */
  getByName(name: string): ThreeLocator {
    return new ThreeLocator(this).filter({ name });
  }

  /** @inheritdoc */
  getByType(type: string): ThreeLocator {
    return new ThreeLocator(this).filter({ type });
  }

  /** @inheritdoc */
  getByUserData<T>(key: string, value: T): ThreeLocator {
    return new ThreeLocator(this).filter({ userData: { [key]: value } });
  }

  async roots(): Promise<Generator<Object3D>> {
    let threeHandle = this.threeHandle;
    // Lazily determine the three JS scene state, if not already done
    if (!threeHandle) {
      await this.page.waitForFunction(() => (window as ThreeWindow).PLAYWRIGHT_THREE !== undefined);
      threeHandle = await this.page.evaluateHandle<RootState>(
        (): RootState => (window as ThreeWindow).PLAYWRIGHT_THREE as RootState,
      );
      this.threeHandle = threeHandle;
    }
    const scene = await threeHandle.evaluate((state) => state.scene);

    return single(scene);
  }
}
