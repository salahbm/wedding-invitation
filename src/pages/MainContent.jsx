import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { motion } from 'framer-motion';
import { CalendarDays, Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const toLocaleId = (language) => {
  if (language === 'uz') return 'uz-UZ';
  if (language === 'ru') return 'ru-RU';
  if (language === 'kr') return 'ko-KR';
  return 'en-US';
};

const capitalize = (value) => {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const buildCalendar = (date) => {
  const current = new Date(date);
  const start = new Date(current);
  start.setDate(current.getDate() - 3);

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);

    return {
      key: `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`,
      day: day.getDate(),
      isEvent: day.toDateString() === current.toDateString(),
    };
  });
};

const SectionLabel = ({ children }) => (
  <div className="flex items-center justify-center gap-3 text-primary-400">
    <div className="h-px w-12 bg-primary-200" />
    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.45em]">
      {children}
    </span>
    <div className="h-px w-12 bg-primary-200" />
  </div>
);

SectionLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function MainContent() {
  const { t, i18n } = useTranslation();

  const eventDate = useMemo(() => new Date(config.data.date), []);
  const locale = toLocaleId(i18n.language);
  const monthYear = useMemo(() => {
    const formatted = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Samarkand',
    }).format(eventDate);

    return capitalize(formatted);
  }, [eventDate, locale]);

  const calendarDays = useMemo(() => buildCalendar(eventDate), [eventDate]);
  const weekdays = t('simpleTemplate.weekdays', { returnObjects: true });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(201,32,32,0.1),transparent_34%),linear-gradient(180deg,#fffdf9_0%,#fffaf4_100%)]"
    >
      <div className="absolute inset-x-0 top-0 h-56 bg-primary-700/5 blur-3xl" />
      <div className="absolute -left-24 top-28 h-56 w-56 rounded-full bg-primary-200/20 blur-3xl" />
      <div className="absolute -right-24 top-[32rem] h-64 w-64 rounded-full bg-primary-200/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[640px] flex-col px-4 pb-10 pt-10 sm:px-6 sm:pt-12">
        <header>
          <motion.img
            src="/images/ornoment.png"
            alt="Ornoments"
            aria-hidden="true"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full select-none object-contain"
          />

          <div className="px-1 sm:px-2">
            <motion.img
              src="/images/karnay.png"
              alt="Karnay"
              aria-hidden="true"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full object-contain drop-shadow-[0_12px_22px_rgba(255,193,7,0.18)]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="px-2 text-center"
          >
            <p className="mx-auto max-w-[420px] text-sm leading-6 text-primary-500/90 sm:text-base">
              {t('simpleTemplate.greeting')}
            </p>
            <p className="mt-4 font-serif text-[2.7rem] italic leading-none text-primary-700 sm:text-5xl">
              {config.data.groomName}
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.5em] text-primary-300">
              {t('simpleTemplate.and')}
            </p>
            <p className="mt-1 font-serif text-[2.7rem] italic leading-none text-primary-700 sm:text-5xl">
              {config.data.brideName}
            </p>
          </motion.div>

          <motion.img
            src="/images/couple.png"
            alt="Couple"
            aria-hidden="true"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mx-auto w-full max-w-[430px] select-none object-contain"
          />
        </header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 space-y-6 px-1 sm:px-2"
        >
          <SectionLabel>{t('simpleTemplate.saveTheDate')}</SectionLabel>

          <div className="text-center">
            <p className="font-serif text-3xl italic text-primary-700 sm:text-4xl">
              {monthYear}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {formatEventDate(config.data.date, 'full', i18n.language)}
            </p>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {Array.isArray(weekdays)
              ? weekdays.map((label) => (
                <div
                  key={label}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-primary-300 sm:text-xs"
                >
                  {label}
                </div>
              ))
              : null}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {calendarDays.map((day) => (
              <div key={day.key} className="flex justify-center">
                {day.isEvent ? (
                  <div className="relative flex items-center justify-center">
                    <Heart className="absolute translate-y-1.5 h-10 w-10 fill-[#d9ba73] text-[#d9ba73]" />
                    <span className="relative z-10 font-serif text-lg text-white">
                      {day.day}
                    </span>
                  </div>
                ) : (
                  <span className="font-serif text-lg text-primary-700/90">
                    {day.day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 space-y-5 px-1 pb-8 sm:px-2"
        >
          <motion.img
            src="/images/ornoment.png"
            alt=""
            aria-hidden="true"
            className="w-full object-contain opacity-95"
          />

          <SectionLabel>{t('simpleTemplate.venueTitle')}</SectionLabel>

          <div className="text-center">
            <p className="font-serif text-3xl italic text-primary-700 sm:text-4xl">
              {config.data.location}
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-500">
              {config.data.address}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={config.data.maps_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-primary-300 bg-primary-50 px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-primary-600 transition-colors hover:bg-primary-100"
            >
              {t('simpleTemplate.mapButton')}
            </a>
            <a
              href={config.data.maps_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-primary-200 bg-white px-4 py-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-gray-600 transition-colors hover:bg-gray-50"
            >
              {t('simpleTemplate.directionButton')}
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-primary-500">
            <CalendarDays className="h-4 w-4" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-primary-300">
              {t('simpleTemplate.timeLabel')}
            </span>
          </div>

          <p className="text-center text-sm leading-6 text-gray-500">
            {config.data.time}
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
}
