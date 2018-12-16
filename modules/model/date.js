/**
 * date
 */

/**
 * @param {number} offset
 * @return {number}
 */
export const areaTimestamp = (offset) => {
  const _date = new Date()
  const _utc = _date.getTime()
  const _deviceOffset = _date.getTimezoneOffset()
  return _utc + 1000 * 60 * (_deviceOffset + offset * 60)
}

/**
 * @param {number} offset
 * @return {Object}
 */
export const areaDate = (offset) => {
  const _offsetDate = new Date(areaTimestamp(offset))

  return {
    year: _offsetDate.getFullYear(),
    day: _offsetDate.getDay(),
    date: _offsetDate.getDate(),
    month: _offsetDate.getMonth(),
    hours: _offsetDate.getHours(),
    minutes: _offsetDate.getMinutes(),
    milliseconds: _offsetDate.getMilliseconds()
  }
}

/**
 * @param {number} num - [0-6]
 * @return {Array<string>}
 */
export const toDayOfWeekEn = (num) => {
  const _DAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  return _DAY[num]
}

/**
 * @param {number} num - [0-11]
 * @return {Array<string>}
 */
export const toMonthEn = (num) => {
  const _MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return _MONTH[num]
}
