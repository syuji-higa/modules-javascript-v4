/**
 * formData
 */

/**
 * @param {Object} obj
 * @return {FormData}
 */
export const toFormData = (obj) => {
  return Object.entries(obj).reduce((fD, [key, val]) => {
    fD.append(key, val)
    return fD
  }, new FormData())
}
