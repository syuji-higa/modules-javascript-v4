import { deepAssign } from '../model/object'
import { serialize } from '../model/query-string'

class Fetch {
  _url = ''
  _options = {}

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      responseType: 'json', // ['blob'|'arrayBuffer'|'json'|'text']
      param: {},
      fetchOptions: {
        credentials: 'same-origin'
      }
    }
  }

  /**
   * @param {string} url
   * @param {Object} [options]
   * @param {string} [options.responseType] - ['blob'|'arrayBuffer'|'json'|'text']
   * @param {Object} [options.param]
   * @param {Object} [options.fetchOptions] - fetch api options
   */
  constructor(url, options = {}) {
    this._url = url
    this._options = deepAssign(Fetch._defOptions, options)
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.responseType] - ['blob'|'arrayBuffer'|'json'|'text']
   * @param {Object} [options.param]
   * @param {Object} [options.fetchOptions] - fetch api options
   * @return {Promise}
   */
  request(options = {}) {
    const { _url, _options } = this
    const { responseType, param, fetchOptions } = deepAssign(_options, options)

    let _query = serialize(param)
    if (_query) `?${_query}`

    return (async () => {
      const _res = await fetch(_url + _query, fetchOptions).catch((err) => {
        throw err
      })

      if (!_res.ok) {
        return new Error(`${_res.status} ${_res.statusText}`)
      }
      if (_res.status === 200) {
        return _res[responseType]()
      } else {
        return new Error(`${_res.status} ${_res.statusText}`)
      }
    })().catch((err) => {
      return Promise.reject(err)
    })
  }
}

export { Fetch as default }
