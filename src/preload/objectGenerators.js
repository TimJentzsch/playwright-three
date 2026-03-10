// @ts-check

/**
 * @import { Object3D } from "three";
 */

/** @typedef {Generator<Object3D>} ObjectGenerator */

/**
 * @param {Object3D | undefined} object The object to generate
 * @returns {ObjectGenerator} A generator that yields the given object only.
 *  Does not yield anything if no object is provided.
 */
function* single(object) {
  if (object) {
    yield object;
  }
}

/**
 * @param {Object3D} root The object to start traversing from.
 * @param {number} maxDepth
 * @returns {ObjectGenerator} A generator doing a depth-first traversal of the object and its descendants.
 */
function* traverse(root, maxDepth) {
  yield root;
  if (maxDepth > 0) {
    yield* traverseAll(root.children, maxDepth - 1);
  }
}

/**
 * @param {Iterable<Object3D>} roots The objects to start traversing from, in order.
 * @param {number} maxDepth The maximum search depth.
 * @returns {ObjectGenerator} A generator doing a depth-first traversal of all given objects and their descendants.
 */
function* traverseAll(roots, maxDepth) {
  for (const object of roots) {
    yield* traverse(object, maxDepth);
  }
}

/**
 * @param {Iterable<Object3D>} roots The objects to traverse the descendants of.
 * @param {number} maxDepth The maximum search depth.
 * @returns {ObjectGenerator} A generator doing a depth-first traversal of the descendants. The roots will not be included.
 */
function* traverseDescendants(roots, maxDepth) {
  for (const object of roots) {
    yield* traverseAll(object.children, maxDepth - 1);
  }
}

/**
 * @param {ObjectGenerator} generator The generator to filter by the condition
 * @param {(obj: Object3D) => boolean} predicate The condition to filter the objects by
 * @returns {ObjectGenerator}
 */
function* filtered(generator, predicate) {
  for (const obj of generator) {
    if (predicate(obj)) {
      yield obj;
    }
  }
}

globalThis.single = single;
globalThis.traverse = traverse;
globalThis.traverseAll = traverseAll;
globalThis.traverseDescendants = traverseDescendants;
globalThis.filtered = filtered;
