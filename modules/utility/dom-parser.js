/**
 * dom-parser
 */

/**
 * @param {string} data
 * @param {string} selector
 * @return {NodeList}
 */
export const getDOMParseElements = (data, selector) => {
  const _$el = new DOMParser().parseFromString(data, 'text/html')
  return _$el.querySelectorAll(selector)
}

/**
 * @param {string} data
 * @param {string} selector
 * @return {Array<DocumentFlagment>}
 */
export const getDOMParseChildElement = (data, selector) => {
  const _$$el = getDOMParseElements(data, selector)
  return Array.from(_$$el, ($el) => {
    return Array.from($el.children).reduce((memo, $child) => {
      memo.appendChild($child)
      return memo
    }, document.createDocumentFragment())
  })
}
