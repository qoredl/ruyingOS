/*const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WEEKDAYS_SHORT = ['Su', 'Mo', 'Tu',
  'We', 'Th', 'Fr', 'Sa'];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];*/

const WEEKDAYS_LONG = ['星期日', '星期六', '星期五',
  '星期四', '星期三', '星期二', '星期一'];

const WEEKDAYS_SHORT = ['日', '六', '五',
  '四', '三', '二', '一'];

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'];

export function formatDay(day) {
  return day.toDateString();
}

export function formatMonthTitle(d) {
  return `${d.getFullYear()} ${MONTHS[d.getMonth()]}`;
}

export function formatWeekdayShort(i) {
  return WEEKDAYS_SHORT[i];
}

export function formatWeekdayLong(i) {
  return WEEKDAYS_LONG[i];
}

export function getFirstDayOfWeek() {
  return 0;
}

export function getMonths() {
  return MONTHS;
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
  getMonths,
};
