import { easings } from './easing'
import { round } from './math'

/**
 * progress
 */

/**
 * @param {string} easing
 * @param {number} time - int[0,inf)
 * @param {number} begin - float[0,inf)
 * @param {number} complete - float[0,inf)
 * @param {number} duration - int[0,inf)
 * @return {number}
 */
export const progress = (easing, time, begin, complete, duration) => {
  let _val = easings[easing](
    Math.min(time, duration),
    begin,
    complete - begin,
    duration
  )
  return round(_val)
}
