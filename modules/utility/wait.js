/**
 * wait
 */

/**
 * @param {number} timer - int[0,inf)
 * @param {number} startTime - int[0,inf)
 * @param {number} interval - int[0,inf)
 * @param {number} timeout - int[0,inf)
 * @param {function} observe
 * @param {function} resolve
 * @param {function} returnValFn
 * @return {Promise}
 */
const check = (
  timer,
  startTime,
  interval,
  timeout,
  observe,
  resolve,
  returnValFn
) => {
  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    if (observe() || timeout < new Date().getTime() - startTime) {
      returnValFn ? resolve(returnValFn()) : resolve()
    } else {
      check(timer, startTime, interval, timeout, observe, resolve, returnValFn)
    }
  }, interval)
}

/**
 * @param {number} interval - int[0,inf)
 * @param {function} observe
 * @param {Object} [opts]
 * @param {number} [opts.timeout] - int[0,inf)
 * @param {?function} [opts.returnValFn]
 * @return {Promise}
 */
export const wait = (interval, observe, opts = {}) => {
  let { timeout, returnValFn } = Object.assign(
    { timeout: 30000, returnValFn: null },
    opts
  )

  let _timer = null
  const _startTime = new Date().getTime()

  return new Promise((resolve) => {
    check(_timer, _startTime, interval, timeout, observe, resolve, returnValFn)
  })
}
