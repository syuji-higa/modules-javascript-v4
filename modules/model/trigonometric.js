/**
 * trigonometric
 */

/**
 * @param {number} base
 * @param {number} angle
 * @return {number}
 */
export const hypotenuseFromBaseAngle = (base, angle) => {
  return base / Math.sin(angle)
}

/**
 * @param {number} height
 * @param {number} angle
 * @return {number}
 */
export const hypotenuseFromHeightAngle = (height, angle) => {
  return height / Math.sin(angle)
}

/**
 * @param {number} base
 * @param {number} height
 * @return {number}
 */
export const hypotenuseFromBaseHeight = (base, height) => {
  return Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2))
}

/**
 * @param {number} base
 * @param {number} angle
 * @return {number}
 */
export const heightFromBaseAngle = (base, angle) => {
  return base * Math.tan(angle)
}

/**
 * @param {number} hypotenuse
 * @param {number} angle
 * @return {number}
 */
export const heightFromHypotenuseAngle = (hypotenuse, angle) => {
  return hypotenuse * Math.sin(angle)
}

/**
 * @param {number} base
 * @param {number} hypotenuse
 * @return {number}
 */
export const heightFromBaseHypotenuse = (base, hypotenuse) => {
  return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(base, 2))
}

/**
 * @param {number} height
 * @param {number} angle
 * @return {number}
 */
export const baseFromHeightAngle = (height, angle) => {
  return height / Math.tan(angle)
}

/**
 * @param {number} hypotenuse
 * @param {number} angle
 * @return {number}
 */
export const baseFromHypotenuseAngle = (hypotenuse, angle) => {
  return hypotenuse * Math.cos(angle)
}

/**
 * @param {number} height
 * @param {number} hypotenuse
 * @return {number}
 */
export const baseFromHeightHypotenuse = (height, hypotenuse) => {
  return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(height, 2))
}

/**
 * @param {number} base
 * @param {number} height
 * @return {number}
 */
export const angleFromBaseHeight = (base, height) => {
  return Math.atan2(height, base)
}

/**
 * @param {number} base
 * @param {number} hypotenuse
 * @return {number}
 */
export const angleFromBaseHypotenuse = (base, hypotenuse) => {
  return Math.acos(base / hypotenuse)
}

/**
 * @param {number} height
 * @param {number} hypotenuse
 * @return {number}
 */
export const angleFromHeightHypotenuse = (height, hypotenuse) => {
  return Math.asin(height / hypotenuse)
}
