/**
 * objectType
 */

const toString = Object.prototype.toString

/**
 * @param {*} target
 * @return {string}
 */
export const objectType = (target) => {
  const _strs = toString.call(target).match(/^\[object (.+)\]$/)

  if (!_strs) {
    throw new Error(`"${target}" is not an object`)
  }

  return _strs[1]
}
