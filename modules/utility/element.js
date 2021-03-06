/**
 * element
 */

/**
 * @param {Element} $el
 * @param {string} selector
 * @param {boolean} [isSlefTarget]
 * @return {?Element}
 */
export const includesElement = ($el, selector, isSlefTarget = true) => {
  const _elms = Array.from(document.querySelectorAll(selector))
  const _$el = isSlefTarget ? $el : $el.parentNode

  const _getParent = ($el) => {
    if (!$el || !$el.tagName || $el.tagName === 'HTML') return null

    if (_elms.includes($el)) {
      return $el
    }

    return _getParent($el.parentNode)
  }

  return _getParent(_$el)
}

/**
 * @param {Elemtnt} el
 * @param {string} dataName
 * @param {Object} [options]
 * @param {boolean} [options.needsSingle]
 * @param {?function} [options.filter]
 * @return {Object}
 */
export const groupByDataElement = (el, dataName, options = {}) => {
  const { needsSingle, filter } = Object.assign(
    {
      needsSingle: false,
      filter: null
    },
    options
  )

  const _$$el = el.querySelectorAll(`[data-${dataName}]`)
  return Array.from(_$$el).reduce((memo, $el) => {
    if (!filter || filter($el)) {
      const _dataName =
        'dataset' in $el
          ? $el.dataset[dataName]
          : $el.getAttribute(`data-${dataName}`)
      if (_dataName) {
        if (needsSingle) {
          memo[_dataName] = $el
        } else {
          if (!memo[_dataName]) {
            memo[_dataName] = []
          }
          memo[_dataName].push($el)
        }
      }
    }
    return memo
  }, {})
}
