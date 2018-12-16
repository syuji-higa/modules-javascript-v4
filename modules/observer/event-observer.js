import Singleton from '../pattern/singleton'
import { createEvent } from '../utility/event'

class EventObserver extends Singleton {
  _events = [] // {Array<Object>}

  /**
   * @example
   *   import EventObserver from '../observer/event-observer';
   *   const eventObserver = EventObserver.getInstance();
   *   const listener = () => console.log('scrolled');
   *   const scrollEvent = eventObserver.create(window, 'scroll', listener);
   *   scrollEvent.add();
   */
  constructor() {
    super()
  }

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {function} listener
   * @param {boolean|Object} [opt]
   * @return {Object}
   * @property {functon} add
   * @property {functon} remove
   */
  create(target, eventType, listener, opt = false) {
    return {
      add: () => {
        this.add(target, eventType, listener, opt)
      },
      remove: () => {
        this.remove(target, eventType, listener)
      }
    }
  }

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {function} listener
   * @param {boolean|Object} [opt]
   * @return {Instance}
   */
  add(target, eventType, listener, opt = false) {
    let _hasEvent = false

    for (const e of this._events) {
      if (
        target === e.target &&
        eventType === e.eventType &&
        opt === e.opt &&
        !e.listeners.includes(listener)
      ) {
        e.listeners.push(listener)
        _hasEvent = true
        return
      }
    }

    if (!_hasEvent) {
      const _listeners = [listener]
      this._events.push({
        target,
        eventType,
        opt,
        listeners: _listeners,
        event: this._addEvent(target, eventType, _listeners, opt)
      })
    }

    return this
  }

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {function} listener
   * @return {Instance}
   */
  remove(target, eventType, listener) {
    this._events.forEach((e, i) => {
      if (
        target === e.target &&
        eventType === e.eventType &&
        e.listeners.includes(listener)
      ) {
        e.listeners.splice(e.listeners.indexOf(listener), 1)
        if (!e.listeners.length) {
          this._removeEvent(i)
        }
        return
      }
    })

    return this
  }

  /**
   * @param {Element} target
   * @param {string} eventType
   * @param {Array<function>} listeners
   * @param {boolean|Object} opt
   * @return {Instance}
   */
  _addEvent(target, eventType, listeners, opt) {
    const _event = createEvent(
      target,
      eventType,
      (e) => {
        for (const listener of listeners) {
          listener(e)
        }
      },
      opt
    )
    _event.add()
    return _event
  }

  /**
   * @param {number} index - int
   */
  _removeEvent(index) {
    this._events.splice(index, 1)
  }
}

export { EventObserver as default }
