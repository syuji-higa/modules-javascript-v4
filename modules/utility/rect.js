/**
 * rect
 */

let _viewportY = 0 // int[0,inf)
let _viewportX = 0 // int[0,inf)

/**
 * @param {Element} $viewport
 */
const _reset = ($viewport) => {
  if ($viewport) {
    const { top, left } = $viewport.getBoundingClientRect()
    _viewportY = $viewport.scrollTop - top
    _viewportX = $viewport.scrollLeft - left
  } else {
    _viewportY = window.pageYOffset
    _viewportX = window.pageXOffset
  }
}

/**
 * @param {Element} $el
 * @param {?Element} $viewport
 * @return {Object}
 * @property {number} width - int[0,inf)
 * @property {number} height - int[0,inf)
 * @property {number} top - int[0,inf)
 * @property {number} right - int[0,inf)
 * @property {number} bottom - int[0,inf)
 * @property {number} left - int[0,inf)
 */
export const rect = ($el, $viewport = null) => {
  _reset($viewport)
  const {
    width,
    height,
    top,
    right,
    bottom,
    left
  } = $el.getBoundingClientRect()
  return {
    width,
    height,
    top: top + _viewportY,
    right: right + _viewportX,
    bottom: bottom + _viewportY,
    left: left + _viewportX
  }
}

/**
 * @param {Element} $el
 * @param {?Element} [$viewport]
 * @return {Object}
 * @property {number} x - float(-inf,inf)
 * @property {number} y - float(-inf,inf)
 */
export const center = ($el, $viewport = null) => {
  const _rect = getRect($el, $viewport)
  return {
    x: _rect.left + _rect.width / 2,
    y: _rect.top + _rect.height / 2
  }
}
