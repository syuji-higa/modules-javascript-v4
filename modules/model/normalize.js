/**
 * normalize
 */

/**
 * @param {number} num
 * @param {number} to
 * @param {number} [from]
 * @return {number}
 */
export const normalizeZeroOne = (num, to, from = 0) => {
  return num / (to - from)
}

/**
 * @param {number} num
 * @param {number} [range]
 * @return {number}
 */
export const normalizeZeroCenter = (num, range = 1) => {
  return num * 2 - range
}
