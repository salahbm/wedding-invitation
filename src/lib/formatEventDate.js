const uzbekLatinMonths = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentabr',
  'Oktabr',
  'Noyabr',
  'Dekabr',
];

const uzbekLatinWeekdays = [
  'Yakshanba',
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
];

/**
 * Formats a date string in 'full', 'short' or 'time' format
 * Fixes broken uz-UZ Intl by manually mapping to Uzbek Latin
 */
export const formatEventDate = (
  isoString,
  format = 'full',
  language = 'en'
) => {
  const date = new Date(isoString);
  const timeZone = 'Asia/Samarkand';

  const localeMap = {
    en: 'en-US',
    ru: 'ru-RU',
    uz: 'uz-Cyrl-UZ', // fallback, but we override manually below
  };

  const options = {
    full: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone,
    },
    short: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone,
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    },
  };

  // Manual override for Uzbek Latin
  if (language === 'uz') {
    const day = date.getDate();
    const month = uzbekLatinMonths[date.getMonth()];
    const year = date.getFullYear();
    const weekday = uzbekLatinWeekdays[date.getDay()];
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    if (format === 'full') return `${weekday}, ${day} ${month} ${year}`;
    if (format === 'short') return `${day} ${month} ${year}`;
    if (format === 'time') return `${hour}:${minute}`;
  }

  const locale = localeMap[language] || 'en-US';

  if (format === 'time') {
    return date.toLocaleTimeString(locale, options.time);
  }

  return date.toLocaleDateString(locale, options[format]);
};
