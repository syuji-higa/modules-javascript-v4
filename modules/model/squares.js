/**
 * squares
 */

/**
 * @param {number} col - int[0,inf)
 * @param {number} x - int[0,inf)
 * @param {number} y - int[0,inf)
 * @return {number}
 */
export const squaresIndex = (col, x, y) => {
  return col * y + x
}

/**
 * @param {number} col - int[0,inf)
 * @param {number} index - int[0,inf)
 * @return {Array<number>}
 */
export const squaresPosition = (col, index) => {
  const x = index % col
  const y = (index - x) / col
  return [x, y]
}
