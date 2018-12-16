/**
 * ratio
 */

/**
 * @param {number} width - int[0,inf)
 * @param {number} height - int[0,inf)
 * @param {number} widthWidthRate - viewport width rate width / height float[0,inf)
 * @return {Object}
 * @property {number} width - int[0,inf)
 * @property {number} height - int[0,inf)
 * @property {number} x - float(inf,inf)
 * @property {number} y - float(inf,inf)
 */
export const cover = (width, height, widthWidthRate) => {
  const _orignRate = width / height

  if (widthWidthRate < _orignRate) {
    const _height = width / widthWidthRate
    return {
      width: width,
      height: _height,
      x: 0,
      y: (height - _height) / 2
    }
  } else {
    const _width = height * widthWidthRate
    return {
      width: _width,
      height: height,
      x: (width - _width) / 2,
      y: 0
    }
  }
}

/**
 * @param {number} w - int[0,inf)
 * @param {number} h - int[0,inf)
 * @return {Object}
 * @property {number} max - float[1,inf)
 * @property {number} width - float[1,inf)
 * @property {number} height - float[1,inf)
 */
export const normalizeOverRatio = (w, h) => {
  const _maxRatio = Math.max(w / h, h / w)
  return {
    max: _maxRatio,
    width: w > h ? _maxRatio : 1,
    height: h > w ? _maxRatio : 1
  }
}

/**
 * @param {number} w - int[0,inf)
 * @param {number} h - int[0,inf)
 * @return {Object}
 * @property {number} min - float[0,1]
 * @property {number} width - float[0,1]
 * @property {number} height - float[0,1]
 */
export const normalizeUnderRatio = (w, h) => {
  const _minRatio = Math.min(w / h, h / w)
  return {
    min: _minRatio,
    width: w > h ? 1 : _minRatio,
    height: h > w ? 1 : _minRatio
  }
}
