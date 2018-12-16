import EventObserver from '../observer/event-observer'
import { sign } from '../model/math'
import SwipeStatus from '../utility/swipe-status'

class TouchEventObserver {
  _swipeStatus // {Instance}
  _$el // {Element}
  _touchEvents = {}
  _mouseEvents = {}

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      reaction: 0, // int[0,inf)
      needsTouch: true,
      needsMouse: false,
      eventOption: false
    }
  }

  /**
   *
   * @param {Element} $el
   * @param {Object} [options]
   * @param {number} [options.reaction] - int[0,inf)
   * @param {boolean} [options.needsTouch]
   * @param {boolean} [options.needsMouse]
   * @param {boolean|Object} [options.eventOption] - eventListener option
   */
  constructor($el, options) {
    const { reaction, needsTouch, needsMouse, eventOption } = Object.assign(
      TouchEventObserver._defaultOptions,
      options
    )

    this._$el = $el

    this._swipeStatus = new SwipeStatus({
      reaction
    })

    const _eventObserver = EventObserver.getInstance()

    this._touchEvents = needsTouch
      ? {
          touchstart: _eventObserver.create(
            $el,
            'touchstart',
            this._onTouchstart.bind(this),
            eventOption
          ),
          touchmove: _eventObserver.create(
            $el,
            'touchmove',
            this._onTouchmove.bind(this),
            eventOption
          ),
          touchend: _eventObserver.create(
            $el,
            'touchend',
            this._onTouchend.bind(this),
            eventOption
          )
        }
      : {}

    this._mouseEvents = needsMouse
      ? {
          mousedown: _eventObserver.create(
            $el,
            'mousedown',
            this._onTouchstart.bind(this),
            eventOption
          ),
          mousemove: _eventObserver.create(
            $el,
            'mousemove',
            this._onTouchmove.bind(this),
            eventOption
          ),
          mouseup: _eventObserver.create(
            $el,
            'mouseup',
            this._onTouchend.bind(this),
            eventOption
          )
        }
      : {}
  }

  add() {
    for (const e of Object.values(this._touchEvents)) {
      e.add()
    }
    for (const e of Object.values(this._mouseEvents)) {
      e.add()
    }
  }

  remove() {
    for (const e of Object.values(this._touchEvents)) {
      e.remove()
    }
    for (const e of Object.values(this._mouseEvents)) {
      e.remove()
    }
  }

  /**
   * @param {Event} e
   */
  _onTouchstart(e) {
    if (this._swipeStatus.isTouching) return

    const { pageX, pageY } = e.changedTouches ? e.changedTouches[0] : e
    this._swipeStatus.start(pageX, pageY)
  }

  /**
   * @param {Event} e
   */
  _onTouchmove(e) {
    if (!this._swipeStatus.isTouching) return

    const { pageX, pageY } = e.changedTouches ? e.changedTouches[0] : e
    this._swipeStatus.move(pageX, pageY)

    const { axis, delta } = this._swipeStatus
    if (axis) {
      this._$el.dispatchEvent(
        new CustomEvent(`panmove${axis.toUpperCase()}`, {
          detail: {
            status: e,
            delta,
            sign: -sign(delta)
          }
        })
      )
    }
  }

  /**
   * @param {Event} e
   */
  _onTouchend(e) {
    const { axis, delta } = this._swipeStatus
    this._$el.dispatchEvent(
      new CustomEvent(`pan${axis.toUpperCase()}`, {
        detail: {
          status: e,
          axis,
          delta,
          sign: -sign(delta)
        }
      })
    )

    this._swipeStatus.end()
  }
}

export { TouchEventObserver as default }
