import { Object3D } from "three";

export type ObjectGenerator = Generator<Object3D>;

/**
 * @param object The object to generate
 * @returns A generator that yields the given object only.
 */
export function* single(object: Object3D): ObjectGenerator {
  yield object;
}

/**
 * @param root The object to start traversing from.
 * @returns A generator doing a depth-first traversal of the object and its descendants.
 */
export function* traverse(root: Object3D): ObjectGenerator {
  yield root;
  yield* traverseAll(root.children);
}

/**
 * @param roots The objects to start traversing from, in order.
 * @returns A generator doing a depth-first traversal of all given objects and their descendants.
 */
export function* traverseAll(roots: Iterable<Object3D>): ObjectGenerator {
  for (const object of roots) {
    yield* traverse(object);
  }
}

/**
 * @param generator The generator to filter by the condition
 * @param predicate The condition to filter the objects by
 */
export function* filtered(
  generator: ObjectGenerator,
  predicate: (obj: Object3D) => boolean
): ObjectGenerator {
  for (const obj of generator) {
    if (predicate(obj)) {
      yield obj;
    }
  }
}
