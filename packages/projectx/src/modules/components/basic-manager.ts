import type {
  ManagerInstance,
  ManagerOptions,
  Path,
  ActionTypes,
} from "../../shared";
import { createUniqPath } from "../../shared";

import { ObserverWithType, interceptor } from "../../components";

abstract class BasicManager<T>
  extends ObserverWithType<T, ActionTypes>
  implements ManagerInstance<T>
{
  public path: Path[];

  constructor(
    public target: T,
    {
      path = [createUniqPath()],
    }: Omit<ManagerOptions<never>, "annotation"> = {}
  ) {
    super();

    this.path = path;

    this.emit("define", { current: this.target });
  }

  public reportUsage(): void {
    interceptor.emit({ path: this.path });
  }

  public joinToPath(key: Path): Path[] {
    return this.path.concat(key);
  }

  public dispose(): void {
    this.path = [];
    super.dispose();
  }

  public get(): T {
    this.reportUsage();

    return this.source();
  }

  public get name(): Path {
    return this.path[this.path.length - 1];
  }

  public abstract set(_value: T): boolean;

  public get snapshot(): T {
    return this.target;
  }

  public source(): T {
    return this.target;
  }

  public abstract support(value: T): boolean;
}

export default BasicManager;
