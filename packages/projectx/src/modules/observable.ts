import type { ManagerInstance, ManagerOptions } from "../shared";
import { isObject, isComputed, isObjectOfClass } from "../shared";

import {
  ArrayManager,
  ComputedManager,
  DynamicObjectManager,
  MapManager,
  ObjectManager,
  SetManager,
  ValueManager,
} from "./components";

export function observable<T>(
  target: T,
  options: ManagerOptions,
  description: PropertyDescriptor = {}
): ManagerInstance {
  if (Array.isArray(target)) {
    return new ArrayManager(target, options);
  }

  if (target instanceof Set) {
    return new SetManager(target, options);
  }

  if (target instanceof Map) {
    return new MapManager(target, options);
  }

  if (isObjectOfClass(target)) {
    return new ObjectManager(target as object, options);
  }

  if (isObject(target)) {
    return new DynamicObjectManager(target as object, options);
  }

  if (isComputed(description)) {
    return new ComputedManager(target as () => never, options);
  }

  return new ValueManager(target, options);
}
