import Singleton from '../pattern/singleton'

class RequestAnimationFramer extends Singleton {
  _animes = new Map()
  _animateHandle = 0 // int[0,inf)

  constructor() {
    super()
  }

  /**
   * @param {Object} key
   * @return {number} float[0,inf)
   */
  getTime(key) {
    return this._animes.get(key).time
  }

  /**
   * @param {Object} key
   * @param {function} fn
   * @param {number} fps - int[0,inf)
   * @param {number} [interval] - int[0,inf)
   * @return {Instance}
   */
  add(key, fn, fps, interval = 0) {
    this._animes.set(key, {
      startTime: new Date().getTime(),
      time: 0,
      frameStartTime: 0,
      ms: fps === 'auto' ? 0 : Math.floor(1000 / fps),
      count: 0,
      interval: interval + 1,
      fn: fn
    })

    if (!this._animateHandle) this._start()

    return this
  }

  /**
   * @param {Object} key
   * @return {Instance}
   */
  remove(key) {
    this._animes.delete(key)
    if (!this._animes.size) this._stop()

    return this
  }

  _start() {
    if (this._animateHandle) return
    this._animate()
  }

  _stop() {
    cancelAnimationFrame(this._animateHandle)
    this._animateHandle = 0
  }

  _animate() {
    this._animateHandle = requestAnimationFrame(this._animate.bind(this))

    const _time = new Date().getTime()

    this._animes.forEach(({ frameStartTime, ms, count, interval, fn }, key) => {
      const _anime = this._animes.get(key)
      _anime.count++
      _anime.time = _time - _anime.startTime
      if (count % interval || ms > _time - frameStartTime) return
      _anime.frameStartTime = _time
      fn()
    })
  }
}

export { RequestAnimationFramer as default }
