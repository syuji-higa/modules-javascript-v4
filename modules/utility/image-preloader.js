import Singleton from '../pattern/singleton'
import { getBackgroundImages } from './background-image'
import { loadImage } from './loader'
import { wait } from './wait'

class ImagePreloader extends Singleton {
  _status = new WeakMap()
  _images = new Map()

  /**
   * @return {Object}
   */
  static get _defOptions() {
    return {
      images: [],
      needsElementLoad: true
    }
  }

  constructor() {
    super()
  }

  /**
   * @param {Element} $el
   * @param {Object} [options]
   * @param {Element} [options.images]
   * @param {boolean} [options.needsElementLoad]
   * @return {Promsie}
   */
  async add($el, options = {}) {
    const { images, needsElementLoad } = Object.assign(
      ImagePreloader._defOptions,
      options
    )

    const _images = new Set()

    // init images
    for (const img of images) {
      if (!this._images.has(img)) {
        _images.add(img)
      }
    }

    // wrap element background image
    for (const bgImg of getBackgroundImages($el)) {
      if (bgImg && !this._images.has(img)) {
        _images.add(bgImg)
      }
    }

    // child elements background images
    for (const $child of $el.getElementsByTagName('*')) {
      for (const bgImg of getBackgroundImages($child)) {
        if (bgImg && !this._images.has(bgImg)) {
          _images.add(bgImg)
        }
      }
    }

    if (needsElementLoad) {
      // img elements images
      await Promise.all(
        Array.from($el.getElementsByTagName('img'), async ($img) => {
          if (!$img.getAttribute('src')) return
          let _img = ''
          await wait(500, () => {
            _img = 'currentSrc' in $img ? $img.currentSrc : $img.src
            return _img
          })
          if (_img && !this._images.has(_img)) {
            _images.add(_img)
          }
        })
      )

      // video elements posters
      Array.from($el.getElementsByTagName('video'), ($video) => {
        const _poster = $video.poster
        if (_poster && !this._images.has(_poster)) {
          _images.add(_poster)
        }
      })

      // svg image elements images
      Array.from($el.getElementsByTagName('image'), ($img) => {
        const _img = $img.getAttribute('xlink:href')
        if (_img && !this._images.has(_img)) {
          _images.add(_img)
        }
      })
    }

    this._status.set($el, {
      images: _images,
      loadedLen: 0
    })
  }

  /**
   * @param {Element} $el
   */
  remove($el) {
    this._status.delete($el)
  }

  /**
   * @param {Element} $el
   * @return {Promise}
   */
  load($el) {
    const _loaders = this.getLoaders($el)
    return Promise.all(_loaders.map((loader) => loader()))
  }

  /**
   * @param {Element} $el
   * @return {Array<function>}
   */
  getLoaders($el) {
    const _images = this._status.get($el).images

    return [..._images].map((src) => {
      return this._load.bind(this, $el, src)
    })
  }

  /**
   * @param {Element} $el
   * @return {Array<string>}
   */
  getImages($el) {
    return this._status.get($el).images
  }

  /**
   * @param {Element} $el
   * @return {number}
   */
  getLoadedLen($el) {
    return this._status.get($el).loadedLen
  }

  /**
   * @param {Element} $el
   * @param {string} src
   * @return {Promise}
   */
  _load($el, src) {
    return loadImage(src, {
      done: (img) => {
        this._images.set(src, {
          src: img.src,
          width: img.width,
          height: img.height
        })
      },
      always: () => {
        this._status.get($el).loadedLen++
      }
    })
  }
}

export { ImagePreloader as default }
