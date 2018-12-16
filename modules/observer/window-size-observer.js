import Singleton from '../pattern/singleton'
import EventObserver from '../observer/event-observer'
import ClientData from '../utility/client-data'
import { debounce } from '../utility/debounce'

class WindowSizeObserver extends Singleton {
  _status = {
    type: '', // {'sp','tb','pc'}
    width: 0, // int[0,inf)
    height: 0 // int[0,inf)
  }
  _isMobileDevice = false
  _resizeDebounce // {function}
  _resizeEvent = {}

  /**
   * @return {Array<number>} - int[0,inf)
   */
  get _breakPoint() {
    return [768, 1024]
  }

  constructor() {
    super()

    const _platformType = ClientData.getInstance().platformType
    this._isMobileDevice = !!_platformType.match(/^(sp|tb)$/)

    this._resizeDebounce = debounce(200)
    this._resizeEvent = EventObserver.getInstance().create(
      window,
      'resize',
      this._onResize.bind(this)
    )
  }

  /**
   * @param {string}
   */
  get type() {
    return this._status.type
  }

  /**
   * @param {Object}
   * @property {number} width - float [0,inf)
   * @property {number} height - float [0,inf)
   */
  get size() {
    return {
      width: this._status.width,
      height: this._status.height
    }
  }

  /**
   * @return {Instance}
   */
  add() {
    this._resizeEvent.add()
    return this
  }

  /**
   * @return {Instance}
   */
  remove() {
    this._resizeEvent.remove()
    return this
  }

  /**
   * @return {Instance}
   */
  resize() {
    this._status.width = window.innerWidth
    this._status.height = window.innerHeight

    if (this._breakPoint[0] > this._status.width) {
      if (this._status.type !== 'sp') {
        this._status.type = 'sp'
        this._dispatchEvent()
      }
    } else if (this._breakPoint[1] > this._status.width) {
      if (this._status.type !== 'tb') {
        this._status.type = 'tb'
        this._dispatchEvent()
      }
    } else {
      if (this._status.type !== 'pc') {
        this._status.type = 'pc'
        this._dispatchEvent()
      }
    }

    document.dispatchEvent(
      new CustomEvent('resize', {
        detail: {
          size: {
            width: this._status.width,
            height: this._status.height
          }
        }
      })
    )

    return this
  }

  _onResize() {
    if (!this._isMobileDevice || this._status.width !== window.innerWidth) {
      this._resizeDebounce(this.resize.bind(this))
    }
  }

  _dispatchEvent() {
    document.dispatchEvent(new CustomEvent('typeChange'))
  }
}

export { WindowSizeObserver as default }
