// @ts-check

/**
 * @import { Scene } from "three";
 */

/**
 * @typedef {object} PlaywrightThree
 * @property {Scene} [scene]
 */

/**
 * @typedef {object} LocatorData
 * @property {LocatorData} [context] the objects in which to search.
 * @property {LocatorFilter} filter the filter to apply to the objects.
 * @property {LocatorOptions} options the options to use for filtering.
 */

/**
 * @typedef {object} LocatorFilter
 * @property {string} [name] the name the object must have.
 * @property {string} [type] the type the object must have.
 * @property {Record<string, unknown>} [userData] the user data the object must have.
 */

/**
 * @typedef {object} LocatorOptions
 * @property {number} [maxDepth] the maximum depth to search at.
 */

/**
 * @param {LocatorData} data the data defining the locator.
 * @returns {ObjectGenerator} a generator over all matching objects.
 */
function applyLocator(data) {
  const roots = data.context ? applyLocator(data.context) : getScene();
  const { name, type, userData } = data.filter;

  return filtered(traverseAll(roots, data.options.maxDepth ?? Infinity), (obj) => {
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

/**
 * Retrieve the exposed three JS scene.
 * The application to test needs to assign `globalThis.PLAYWRIGHT_THREE.scene` to the scene object.
 *
 * @returns {ObjectGenerator}
 */
function getScene() {
  return single(
    /** @type {{ PLAYWRIGHT_THREE?: PlaywrightThree }} */ (globalThis).PLAYWRIGHT_THREE?.scene,
  );
}

globalThis.applyLocator = applyLocator;
