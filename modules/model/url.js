/**
 * url
 */

/**
 * @param {string} str
 * @return {Object}
 * @property {string} href - 'http://localhost:3000/about/index.html?param#hash'
 * @property {string} hrefPathname - 'http://localhost:3000/about/index.html'
 * @property {string} hrefDirname - 'http://localhost:3000/about/'
 * @property {string} origin - 'http://localhost:3000'
 * @property {string} protocol  - 'http:'
 * @property {string} host - 'localhost:3000'
 * @property {string} hostname - 'localhost'
 * @property {string} port - '3000'
 * @property {string} local - '/about/index.html?param#hash'
 * @property {string} pathname - '/about/index.html'
 * @property {string} dirname - '/about/'
 * @property {string} filename - 'index.html'
 * @property {string} extname - 'html'
 * @property {string} search - '?param'
 * @property {string} hash - '#hash'
 */
export const parseUrl = (str) => {
  const _urlStrs = str.match(
    /^(http:|https:)\/\/([^\/:]+):?([0-9]{1,5})?(\/[^?#]*)(\?[^#]+)?(#.*)?$/
  )

  if (!_urlStrs) return null

  const [
    _href,
    _protocol,
    _hostname,
    _port,
    _pathname,
    _search,
    _hash
  ] = _urlStrs

  const _host = _port ? `${_hostname}:${_port}` : _hostname
  const _origin = `${_protocol}//${_host}`
  const _local = (() => {
    let _pn = _pathname
    if (_search) _pn += _search
    if (_hash) _pn += _hash
    return _pn
  })()
  const _filenameStrs = _pathname.match(/^[^.]*(\/(.+\.(.+)))?$/)
  const _dirname = _pathname.replace(_filenameStrs[2], '')

  return {
    href: _href,
    hrefPathname: _origin + _pathname,
    hrefDirname: _origin + _dirname,
    origin: _origin,
    local: _local,
    protocol: _protocol,
    host: _host,
    hostname: _hostname,
    port: _port,
    pathname: _pathname,
    dirname: _dirname,
    filename: _filenameStrs[2],
    extname: _filenameStrs[3],
    search: _search,
    hash: _hash
  }
}

/**
 * @param {string} href
 * @return {boolean}
 */
export const isMatchLocation = (href) => {
  const { origin, pathname } = parseUrl(location.href)

  const _rx = new RegExp(`^${origin}${pathname}(\\\?.+)?(#.*)?$`)

  return !!href.match(_rx)
}
