import Singleton from '../pattern/singleton'
import WindowSizeObserver from './window-size-observer'
import EventObserver from './event-observer'
import { throttle } from '../utility/throttle'

class MouseMoveObserver extends Singleton {
  _status = {
    x: 0, // float[-1,1]
    y: 0 // float[-1,1]
  }
  _windowSizeObserver // {Instance}
  _mousemoveThrottle // {function}
  _mousemoveEvent = {}

  constructor() {
    super()

    this._windowSizeObserver = WindowSizeObserver.getInstance()

    this._mousemoveThrottle = throttle(100)

    const _eventObserver = EventObserver.getInstance()
    this._mousemoveEvent = _eventObserver.create(
      window,
      'mousemove',
      this._onMousemove.bind(this)
    )

    this.add()
  }

  /**
   * @param {Object}
   * @property {number} x - float[-1,1]
   * @property {number} y - float[-1,1]
   */
  get position() {
    return {
      x: this._status.x,
      y: this._status.y
    }
  }

  /**
   * @return {Instance}
   */
  add() {
    this._mousemoveEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  remove() {
    this._mousemoveEvent.remove()
    return this
  }

  /**
   * @param {Event} e
   */
  _onMousemove(e) {
    this._mousemoveThrottle(this._mousemoved.bind(this, e))
  }

  _mousemoved(e) {
    const { width, height } = this._windowSizeObserver.size

    this._status.x = (e.clientX / width) * 2 - 1
    this._status.y = (e.clientY / height) * 2 - 1
  }
}

export { MouseMoveObserver as default }
