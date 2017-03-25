/* eslint-disable import/no-extraneous-dependencies, no-underscore-dangle */
import locale from '../var/locale';
import moment from 'moment';

export function formatDay(day, locale = locale) {
  return moment(day).locale(locale).format('ddd ll');
}

export function formatMonthTitle(date, locale = locale) {
  return moment(date).locale(locale).format('MMMM YYYY');
}

export function formatWeekdayShort(day, locale = locale) {
  return moment().locale(locale)._locale.weekdaysMin()[day];
}

export function formatWeekdayLong(day, locale = locale) {
  return moment().locale(locale)._locale.weekdays()[day];
}

export function getFirstDayOfWeek(locale = locale) {
  const localeData = moment.localeData(locale);
  return localeData.firstDayOfWeek();
}

export function getMonths(locale = locale) {
  const months = [];
  let i = 0;
  while (i < 12) {
    months.push(moment().locale(locale).month(i).format('MMMM'));
    i += 1;
  }
  return months;
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
  getMonths,
};
