/**
 * background-images
 */

/**
 * @param {Element} $el
 * @return {Array<string>}
 */
export const getBackgroundImages = ($el) => {
  const _backgroundImage = getComputedStyle($el, '').backgroundImage
  const _paths = []

  if (_backgroundImage === 'none') return _paths

  const _images = _backgroundImage.split(/,\s?/)

  if (!_images) return _paths

  for (const img of _images) {
    const _path = img.match(/^url\(['"]?(.+[0-9a-zA-Z])['"]?\)$/)

    if (typeof _path !== 'undefined' && _path !== null) {
      _paths.push(_path[1])
    }
  }

  return _paths
}
