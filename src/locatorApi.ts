/**
 * The common interface for locating 3D objects in the scene.
 */
export interface ObjectLocatorApi {
  /**
   * @param name The name of the object to locate.
   *  Note that object names need to be explicitly set and must not be unique.
   * @returns A locator for the object with the specified name.
   */
  getByName(name: string): ObjectLocatorApi;

  /**
   * @param type The type identifier of the object.
   * @returns A locator for the object with the specified type identifier.
   */
  getByType(type: string): ObjectLocatorApi;

  /**
   * @param key The key of the user data entry.
   * @param value The expected value of the user data entry.
   */
  getByUserData<T>(key: string, value: T): ObjectLocatorApi;
}
