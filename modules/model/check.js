/**
 * check
 */

/**
 * @param {*} arg
 * @return {boolean}
 */
export const isJson = (arg) => {
  const _unknown = typeof arg === 'function' ? arg() : arg
  if (typeof _unknown !== 'string') {
    return false
  }
  try {
    JSON ? JSON.parse(_unknown) : eval(`(${_unknown})`)
    return true
  } catch (err) {
    return false
  }
}
