import Singleton from '../pattern/singleton'
import EventObserver from './event-observer'
import TouchEventObserver from './touch-event-observer'
import { discontinuity } from '../utility/discontinuity'

class OnescrollObserver extends Singleton {
  _wheelEventDiscontinuity // {function}
  _wheelEvent = {}
  _panYEvent = {}
  _keyupEvent = {}

  constructor() {
    super()

    new TouchEventObserver(window, 'pan').add()

    const _eventObserver = EventObserver.getInstance()

    this._wheelEventDiscontinuity = discontinuity()
    this._wheelEvent = _eventObserver.create(
      window,
      'wheel',
      this._onWheel.bind(this)
    )
    this._panYEvent = _eventObserver.create(
      window,
      'panY',
      this._onPan.bind(this)
    )
    this._keyupEvent = _eventObserver.create(
      document,
      'keyup',
      this._onKeyup.bind(this)
    )
  }

  /**
   * @return {Instance}
   */
  add() {
    this._wheelEvent.add()
    this._panYEvent.add()
    this._keyupEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  remove() {
    this._wheelEvent.remove()
    this._panYEvent.remove()
    this._keyupEvent.remove()
    return this
  }

  /**
   * @param {Event} e
   */
  _onWheel(e) {
    this._wheelEventDiscontinuity(this._wheeled.bind(this, e))
  }

  /**
   * @param {Event} e
   */
  _wheeled(e) {
    const { deltaY } = e
    const _dirction = 0 > deltaY ? 'prev' : 0 < deltaY ? 'next' : null
    this._dispatch(_dirction)
  }

  /**
   * @param {Event} e
   */
  _onPan(e) {
    this._paned(e)
  }

  /**
   * @param {Event} e
   */
  _paned(e) {
    const { sign } = e.detail
    const _dirction = 0 > sign ? 'prev' : 0 < sign ? 'next' : null
    this._dispatch(_dirction)
    if (_dirction) {
      e.detail.status.preventDefault()
    }
  }

  /**
   * @param {Event} e
   */
  _onKeyup(e) {
    const _dirction = (() => {
      switch (e.which) {
        // up key
        case 38: {
          return 'prev'
        }
        // down key
        case 40: {
          return 'next'
        }
        // space key
        case 32: {
          return 'next'
        }
        default:
          return null
      }
    })()
    this._dispatch(_dirction)
  }

  /**
   * @param {?string} dirction - ['prev'|'next']
   */
  _dispatch(dirction) {
    if (!dirction) return
    document.dispatchEvent(
      new CustomEvent('onescroll', {
        detail: { dirction }
      })
    )
  }
}

export { OnescrollObserver as default }
