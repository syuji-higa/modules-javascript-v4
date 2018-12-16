/**
 * discontinuity
 */

/**
 * @param {Object} [options]
 * @param {number} [options.interval] - int[0,inf)
 * @param {number} [options.timeout] - int[0,inf)
 * @return {function(fn: function)}
 */
export const discontinuity = (options = {}) => {
  const { interval, timeout } = Object.assign(
    { interval: 100, timeout: 2000 },
    options
  )

  let _flag = false
  let _lastTime = new Date().getTime()
  let _timeoutTime = _lastTime + timeout

  return (fn) => {
    const _time = new Date().getTime()
    const _isTimeout = _timeoutTime <= _time
    if (_isTimeout || _flag) {
      fn()
      _timeoutTime = _time + timeout
      _flag = false
    }
    if (!_isTimeout && _lastTime + interval <= _time) {
      _flag = true
    }
    _lastTime = _time
  }
}
