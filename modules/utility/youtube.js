import Singleton from '../pattern/singleton'
import { deepAssign } from '../model/object'
import { onDispatchEvent } from './event'

class Youtube extends Singleton {
  _youtubes = {}

  /**
   * @return {Object}
   */
  static get _defaultOptions() {
    return {
      width: 800,
      height: 450,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        wmode: 'opaque'
      }
    }
  }

  constructor() {
    super()

    // insert youtube api script tag
    const _tag = document.createElement('script')
    _tag.src = 'https://www.youtube.com/iframe_api'
    const _firstScriptTag = document.getElementsByTagName('script')[0]
    _firstScriptTag.parentNode.insertBefore(_tag, _firstScriptTag)
  }

  /**
   * @param {Element} $el
   * @param {string} youtubeId - 11 length
   * @param {Object} [options] - youtube api options
   * @return {Instance}
   */
  create($el, youtubeId, options = {}) {
    const _options = deepAssign(Youtube._defaultOptions, options)
    _options.videoId = youtubeId
    _options.events = {
      onReady: onDispatchEvent.bind(this, [$el, 'onPlayerReady']),
      onStateChange: onDispatchEvent.bind(this, [$el, 'onStateChange']),
      onPlaybackQualityChange: onDispatchEvent.bind(this, [
        $el,
        'onPlaybackQualityChange'
      ]),
      onPlaybackRateChange: onDispatchEvent.bind(this, [
        $el,
        'onPlaybackRateChange'
      ]),
      onError: onDispatchEvent.bind(this, [$el, 'onError']),
      onApiChange: onDispatchEvent.bind(this, [$el, 'onApiChange'])
    }

    this._youtubes[youtubeId] = {
      $el: $el,
      options: _options,
      player: null
    }

    return this
  }

  /**
   * @param {string} id
   * @return {Promise}
   */
  load(id) {
    return new Promise((resolve) => {
      if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        window.onYouTubeIframeAPIReady = async () => {
          const _player = this._onLoad(id)
          await this._onReady(id)
          resolve(_player)
        }
      } else {
        ;(async () => {
          const _player = this._onLoad(id)
          await this._onReady(id)
          resolve(_player)
        })()
      }
    })
  }

  /**
   * @param {string} youtubeId
   * @return {Instance}
   */
  _onLoad(youtubeId) {
    const { $el, options } = this._youtubes[youtubeId]
    const _id = $el.id
    const _player = new YT.Player(_id, options)
    this._youtubes[youtubeId].player = _player
    return _player
  }

  /**
   * @param {string} youtubeId
   * @return {Promise}
   */
  _onReady(youtubeId) {
    return new Promise((resolve) => {
      this._youtubes[youtubeId].$el.addEventListener(
        'onPlayerReady',
        () => resolve(),
        { once: true }
      )
    })
  }
}

export { Youtube as default }
