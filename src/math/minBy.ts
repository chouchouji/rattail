export function minBy<T>(arr: T[], fn: (val: T) => number) {
  if (!arr.length) {
    return
  }

  return arr.reduce((result, item) => (fn(result) < fn(item) ? result : item), arr[0])
}
