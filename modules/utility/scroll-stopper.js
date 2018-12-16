import Singleton from '../pattern/singleton'
import EventObserver from '../observer/event-observer'

class ScrollStopper extends Singleton {
  _wheelEvent = {}
  _mousemoveEvent = {}

  constructor() {
    super()

    const _eventObserver = EventObserver.getInstance()

    this._wheelEvent = _eventObserver.create(
      window,
      'wheel',
      this._stop.bind(this)
    )
    this._mousemoveEvent = _eventObserver.create(
      window,
      'touchmove',
      this._stop.bind(this),
      {
        passive: false
      }
    )
  }

  /**
   * @param {Instance}
   */
  on() {
    this._wheelEvent.add()
    this._mousemoveEvent.add()
    return this
  }

  /**
   * @param {Instance}
   */
  off() {
    this._wheelEvent.remove()
    this._mousemoveEvent.remove()
    return this
  }

  /**
   * @param {Event} e
   */
  _stop(e) {
    e.preventDefault()
  }
}

export { ScrollStopper as default }
