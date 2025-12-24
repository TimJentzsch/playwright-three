/** @import { Object3D } from "three"; */

/**
 * @typedef {Generator<Object3D>} ObjectGenerator
 */

/**
 * @param {Object3D} object The object to generate
 * @returns {ObjectGenerator} A generator that yields the given object only.
 */
export function* single(object) {
  yield object;
}

/**
 * @param {Object3D} root The object to start traversing from.
 * @returns {ObjectGenerator} A generator doing a depth-first traversal
 *  of the object and its descendants.
 */
export function* traverse(root) {
  yield root;
  yield* traverseAll(root.children);
}

/**
 * @param {Iterable<Object3D>} roots The objects to start traversing from, in order.
 * @returns {ObjectGenerator} A generator doing a depth-first traversal of all given objects and their descendants.
 */
export function* traverseAll(roots) {
  for (const object of roots) {
    yield* traverse(object);
  }
}

/**
 * @param {ObjectGenerator} generator The generator to filter by the condition
 * @param {(obj: Object3D) => boolean} predicate The condition to filter the objects by
 * @returns {ObjectGenerator} A generator yielding only the objects that satisfy the condition
 */
export function* filtered(
  generator,
  predicate
) {
  for (const obj of generator) {
    if (predicate(obj)) {
      yield obj;
    }
  }
}
