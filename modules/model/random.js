/**
 * random
 */

/**
 * @param {number} num - float(inf,inf)
 * @param {number} [min] - float(inf,inf)
 * @return {number} float(inf,inf)
 */
export const random = (num, min = 0) => {
  return Math.random() * (num - min) + min
}

/**
 * @param {number} num - int(inf,inf)
 * @param {number} [min] - int(inf,inf)
 * @return {number} int(inf,inf)
 */
export const randomInt = (num, min = 0) => {
  return Math.floor(random(num + 1, min))
}

/**
 * @return {number} int{1,-1}
 */
export const randomDir = () => {
  return randomInt(1) ? 1 : -1
}
