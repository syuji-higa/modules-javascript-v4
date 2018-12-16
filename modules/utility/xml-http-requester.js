import { deepAssign } from '../model/object'

class XMLHttpRequester {
  _url = ''
  _options = {}
  _xhr // {Instance}

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      method: 'get'
    }
  }

  /**
   * @param {string} url
   * @param {Object} [options]
   * @param {string} [options.method]
   */
  constructor(url, options = {}) {
    this._url = url
    this._options = deepAssign(XMLHttpRequester._defOptions, options)
    this._xhr = new XMLHttpRequest()
  }

  /**
   * @param {Object} [options]
   * @param {string} [options.method]
   * @return {Promise}
   */
  request(options = {}) {
    const { method } = deepAssign(this._options, options)

    return new Promise((resolve, reject) => {
      this._xhr.open(method, this._url, false)

      this._xhr.onreadystatechange = () => {
        switch (this._xhr.readyState) {
          case 0:
            console.log('uninitialized!')
            reject()
            break
          case 1:
            console.log('loading...')
            reject()
            break
          case 2:
            console.log('loaded.')
            reject()
            break
          case 3:
            console.log(
              `interactive... ${this._xhr.responseText.length} bytes.`
            )
            reject()
            break
          case 4:
            if (this._xhr.status == 200 || this._xhr.status == 304) {
              const _data = this._xhr.responseText
              resolve(_data)
            } else {
              console.log('Failed. HttpStatus: ' + this._xhr.statusText)
              reject()
            }
            break
          default:
            reject()
        }
      }

      this._xhr.send()
    })
  }
}

export { XMLHttpRequester as default }
