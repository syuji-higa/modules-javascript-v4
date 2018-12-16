import Singleton from '../pattern/singleton'
import { progress } from '../model/progress'

class StatusProgressor extends Singleton {
  _status = new Map()

  constructor() {
    super()
  }

  /**
   * @param {Object} key
   * @param {Object} objectStatus
   * @param {Object} transformObject
   * @return {Instance}
   */
  add(key, objectStatus, transformObject) {
    this._status.set(key, {})

    for (const [transformKey, transformValues] of Object.entries(
      transformObject
    )) {
      if (!(transformKey in objectStatus)) {
        throw new Error(`Not find "${transformKey}" status key.`)
      }
      this._status.get(key)[transformKey] = {
        startTime: new Date().getTime(),
        begin: objectStatus[transformKey],
        complete: transformValues[0],
        duration: transformValues[1],
        easing: transformValues[2]
      }
    }

    return this
  }

  /**
   * @param {Object} key
   * @return {Instance}
   */
  remove(key) {
    this._status.delete(key)

    return this
  }

  /**
   * @param {Object} key
   * @param {number} time - int[0,inf)
   * @return {?Object}
   */
  update(key, time) {
    const _updateStatus = {}

    for (const [statusKey, statusValues] of Object.entries(
      this._status.get(key)
    )) {
      let _val = progress(
        statusValues.easing,
        time - statusValues.startTime,
        statusValues.begin,
        statusValues.complete,
        statusValues.duration
      )
      if (statusValues.complete === _val) {
        delete this._status.get(key)[statusKey]
      }
      _updateStatus[statusKey] = _val
    }

    if (Object.values(_updateStatus).length) {
      return _updateStatus
    } else {
      this.remove()
      return null
    }
  }
}

export { StatusProgressor as default }
