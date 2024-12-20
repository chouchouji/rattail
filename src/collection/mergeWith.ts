import { hasOwn, isArray, isObject } from '../general'

export function mergeWith<T extends Record<string, any>, K extends Record<string, any>>(
  object: T,
  source: K,
  fn: (objValue: any, srcValue: any, key: string | number | symbol, object?: T, source?: K) => any,
): T & K {
  function baseMerge(target: any, src: any): any {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in src) {
      if (hasOwn(src, key)) {
        const srcValue = src[key]
        const targetValue = target[key]

        const customResult = fn(targetValue, srcValue, key, object, source)

        if (customResult !== undefined) {
          target[key] = customResult
        } else if (isObject(srcValue)) {
          if (isObject(targetValue)) {
            target[key] = baseMerge(targetValue, srcValue)
          } else {
            target[key] = baseMerge(isArray(srcValue) ? [] : {}, srcValue)
          }
        } else {
          target[key] = srcValue
        }
      }
    }
    return target
  }

  return baseMerge(object as any, source as any) as T & K
}
