/**
 * debounce
 */

/**
 * @param {Object} [options]
 * @param {number} [options.interval] - int[0,inf)
 * @param {boolean} [options.isFirstRun]
 * @return {function(fn: function)}
 */
export const debounce = (options = {}) => {
  const { interval, isFirstRun } = Object.assign(
    { interval: 100, isFirstRun: false },
    options
  )
  let _timer = 0
  let _firstRun = true

  return (fn) => {
    if (isFirstRun && _firstRun) {
      fn()
      _firstRun = false
    }
    clearTimeout(_timer)
    _timer = setTimeout(() => {
      fn()
      _timer = 0
      if (isFirstRun) {
        _firstRun = true
      }
    }, interval)
  }
}
