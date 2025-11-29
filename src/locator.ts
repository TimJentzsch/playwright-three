export class ThreeLocator {
  nameFilter?: string;

  withName(name: string): ThreeLocator {
    this.nameFilter = name;
    return this;
  }
}
