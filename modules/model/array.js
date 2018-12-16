/**
 * array
 */

/**
 * @param {number} num
 * @param {?*} val
 * @return {Array}
 */
export const createArray = (num, val) => {
  const _arr = []

  for (let i = 0; num > i; i++) {
    _arr[i] = val
  }

  return _arr
}

/**
 * @param {number} num
 * @param {number} [start]
 * @return {Array}
 */
export const createSerialNumberArray = (num, start = 0) => {
  const _arr = []

  for (let i = 0; num > i; i++) {
    _arr[i] = start + i
  }

  return _arr
}

/**
 * @param {Array} arr
 */
export const shuffleArray = (arr) => {
  let _n = arr.length
  let _t = 0
  let _i = 0

  while (_n) {
    _i = Math.floor(Math.random() * _n--)
    _t = arr[_n]
    arr[_n] = arr[_i]
    arr[_i] = _t
  }

  return arr
}

/**
 * @param {Array} arr
 * @return {Array}
 */
export const flattenArray = (arr) => {
  return arr.reduce((memo, val) => {
    return Array.isArray(val)
      ? memo.concat(flattenArray(val))
      : memo.concat(val)
  }, [])
}

/**
 * @param {Array} arr
 * @param {number} num
 * @return {Array}
 */
export const caterpillarArray = (arr, num) => {
  if (0 < num) {
    return arr.push(...arr.splice(0, num))
  } else if (0 > num) {
    return arr.unshift(...arr.splice(num, arr.length - num))
  }
  return arr
}
