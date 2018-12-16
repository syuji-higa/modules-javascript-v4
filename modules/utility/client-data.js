import Singleton from '../pattern/singleton'
import bowser from 'bowser'

class ClientData extends Singleton {
  _result = {}
  _platformType = '' // {'sp','tb','pc'}

  constructor() {
    super()

    this._result = bowser.getParser(navigator.userAgent).parse().parsedResult

    this._platformType = (() => {
      switch (this._result.platform.type) {
        case 'mobile':
          return 'sp'
        case 'tablet':
          return 'tb'
        default:
          return 'pc'
      }
    })()
  }

  /**
   * @return {Object}
   */
  get result() {
    return this._result
  }

  /**
   * @return {string}
   */
  get platformType() {
    return this._platformType
  }
}

export { ClientData as default }
