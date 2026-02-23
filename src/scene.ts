import type { JSHandle, Page } from "@playwright/test";
import type { RootState } from "@react-three/fiber";
import { ThreeLocator } from "./locator";
import { LocatorOptions, ObjectLocatorApi } from "./locatorApi";
import { LocatorContext } from "./locatorContext";

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

  async roots(): Promise<JSHandle<ObjectGenerator>> {
    let threeHandle = this.threeHandle;
    // Lazily determine the three JS scene state, if not already done
    if (!threeHandle) {
      await this.page.waitForFunction(() => (window as ThreeWindow).PLAYWRIGHT_THREE !== undefined);
      threeHandle = await this.page.evaluateHandle<RootState>(
        (): RootState => (window as ThreeWindow).PLAYWRIGHT_THREE as RootState,
      );
      this.threeHandle = threeHandle;
    }
    const sceneHandle = await threeHandle.evaluateHandle((state) => single(state.scene));

    return sceneHandle;
  }
}
