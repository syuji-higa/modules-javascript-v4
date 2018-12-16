/**
 * script
 */

/**
 * @param {Element} $script
 * @return {Element}
 */
export const cloneScript = ($script) => {
  let _script = document.createElement('script')
  const _attrs = $script.attributes
  for (const attr of _attrs) {
    _script.setAttribute(attr.name, attr.value)
  }
  _script.innerHTML = $script.innerHTML
  return _script
}
