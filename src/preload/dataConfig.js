/**
 * @import { Color, Material, Vector3Tuple } from "three";
 */

/**
 * @typedef {object} ObjectDataRequest
 * @property {MaterialDataRequest} [material]
 * @property {boolean} [isVisible]
 * @property {boolean} [position]
 */

/**
 * @typedef {object} MaterialDataRequest
 * @property {boolean} [color]
 */

/**
 * @typedef {object} ObjectDataResponse
 * @property {MaterialDataResponse} [material] the requested material data.
 * @property {boolean} [isVisible] whether the object is visible in the scene.
 * @property {Vector3Tuple} [position] the global position of the object.
 */

/**
 * @typedef {object} MaterialDataResponse
 * @property {Color} [color] the color configured in the material.
 */

/**
 *
 * @param {ObjectDataRequest} request the data that has been requested about the object.
 * @returns {(obj: Object3D) => ObjectDataResponse} a function to return the requested data for an object.
 */
function getObjectData(request) {
  return (obj) => {
    /** @type {ObjectDataResponse} */
    const response = {};

    if (request.isVisible) {
      response.isVisible = obj.visible;
    }

    if (request.position) {
      // HACK: Can't construct a Vector3 directly, because three JS can't be imported in this file
      const worldPos = obj.position.clone();
      obj.getWorldPosition(worldPos);
      response.position = worldPos.toArray();
    }

    if (request.material && obj.material) {
      response.material = getMaterialData(request.material)(obj.material);
    }

    return response;
  };
}

/**
 *
 * @param {MaterialDataRequest} request the data that has been requested about the material.
 * @returns {(material: any) => MaterialDataResponse} a function to return the requested data for an object.
 */
function getMaterialData(request) {
  return (material) => {
    /** @type {MaterialDataResponse} */
    const response = {};

    if (request.color) {
      const color = material.color;
      if (color && color.isColor) {
        response.color = color;
      }
    }

    return response;
  };
}

globalThis.getObjectData = getObjectData;
globalThis.getMaterialData = getMaterialData;
