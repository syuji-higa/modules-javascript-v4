/**
 * parameter
 */

import { parse } from './query-string'

/**
 * @return {string}
 */
const _hashQuery = () => {
  const { hash } = location

  const _hash = hash.match(/^.*\?(.*)$/)

  if (typeof _hash === 'undefined') return ''

  return hash.match(/^.*\?(.*)$/)[1]
}

/**
 * @param {boolean} [isHash]
 * @return {string}
 */
export const query = (isHash = false) => {
  return isHash ? _hashQuery() : location.search.replace('?', '')
}

/**
 * @param {string} query
 * @return {Object}
 */
export const toParams = (query) => {
  return query ? parse(query) : {}
}

/**
 * @param {boolean} [isHash]
 * @return {Object}
 */
export const params = (isHash) => {
  const _query = getQuery(isHash)
  return _query ? parse(_query) : {}
}

/**
 * @param {string} name
 * @param {Object} [opts]
 * @param {?string} [opts.query]
 * @param {boolean} [opts.isHash]
 * @return {string}
 */
export const paramVal = (name, opts = {}) => {
  const { query = null, isHash = false } = opts

  const _query = query || getQuery(isHash)

  if (!_query) return ''

  const _params = parse(_query)

  if (typeof _params === 'undefined') return ''

  return _params[name]
}
