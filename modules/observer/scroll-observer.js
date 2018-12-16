import Singleton from '../pattern/singleton'
import EventObserver from './event-observer'
import { throttle } from '../utility/throttle'

class ScrollObserver extends Singleton {
  _status = {
    x: 0, // int[0,inf)
    y: 0 // int[0,inf)
  }
  _scrollThrottle // {function}
  _scrollEvent = {}

  constructor() {
    super()

    this._scrollThrottle = throttle(200)
    const _eventObserver = EventObserver.getInstance()
    this._scrollEvent = _eventObserver.create(
      window,
      'scroll',
      this._onScroll.bind(this)
    )

    this.add().update()
  }

  /**
   * @param {Object}
   * @property {number} x - int[0,inf)
   * @property {number} y - int[0,inf)
   */
  get offset() {
    return {
      x: this._status.x,
      y: this._status.y
    }
  }

  /**
   * @return {Instance}
   */
  add() {
    this._scrollEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  remove() {
    this._scrollEvent.remove()
    return this
  }

  /**
   * @return {Instance}
   */
  update() {
    this._status.x = window.pageXOffset
    this._status.y = window.pageYOffset

    document.dispatchEvent(
      new CustomEvent('windowScroll', {
        detail: {
          offset: {
            x: this._status.x,
            y: this._status.y
          }
        }
      })
    )

    return this
  }

  _onScroll() {
    this._scrollThrottle(this.update.bind(this))
  }
}

export { ScrollObserver as default }
