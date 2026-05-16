import config from '@/config/config';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
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
    <span className="text-[0.68rem] text-center font-semibold uppercase tracking-[0.45em]">
      {children}
    </span>
    <div className="h-px w-12 bg-primary-200" />
  </div>
);

SectionLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

const hangingOrnaments = [
  {
    src: '/images/hanging-odoments.png',
    top: '-1.1rem',
    left: '0.9rem',
    width: '2.7rem',
    delay: 0,
    drift: [0, -6, 0, 6, 0],
    rotate: [0, -1, 0, 1, 0],
  },
  {
    src: '/images/hanging-odoments.png',
    top: '-0.9rem',
    left: '50%',
    width: '2.9rem',
    delay: 0.65,
    drift: [0, 5, 0, -5, 0],
    rotate: [0, 0.8, 0, -0.8, 0],
  },
  {
    src: '/images/hanging-odoments.png',
    top: '-1.15rem',
    right: '1rem',
    width: '2.7rem',
    delay: 1.1,
    drift: [0, -5, 0, 5, 0],
    rotate: [0, -0.8, 0, 0.8, 0],
  },
];



const patternedCircles = [
  {
    src: '/images/circle-pattern.png',
    top: '45.75rem',
    right: '-3.4rem',
    width: '9.5rem',
    delay: 0,
    drift: [0, 3, 0, -3, 0],
    rotate: [-2.5, 2.5, -2.5],
    scale: 0.42,
    opacity: 0.22,
  },
  {
    src: '/images/circle-pattern.png',
    top: '48.8rem',
    right: '1.1rem',
    width: '8.2rem',
    delay: 0.6,
    drift: [0, -2, 0, 2, 0],
    rotate: [2, -2, 2],
    scale: 0.38,
    opacity: 0.1,
  },
];

export default function MainContent() {
  const { t, i18n } = useTranslation();

  const eventDate = useMemo(() => new Date(config.data.date), []);
  const startTime = useMemo(() => {
    const startTimeParam = Number(
      new URLSearchParams(window.location.search).get('startTime')
    );

    const startHour = startTimeParam === 11 ? 11 : 10;
    return `${String(startHour).padStart(2, '0')}:00`;
  }, []);
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {hangingOrnaments.map((item, index) => (
          <motion.img
            key={`hanging-${index}`}
            src={item.src}
            alt=""
            className="absolute select-none object-contain"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              width: item.width,
            }}
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: item.drift, rotate: item.rotate }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          />
        ))}
        {patternedCircles.map((item, index) => (
          <motion.img
            key={`pattern-${index}`}
            src={item.src}
            alt=""
            className="absolute select-none object-contain"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              width: item.width,
              opacity: item.opacity,
            }}
            initial={{ opacity: item.opacity, x: 0, rotate: 0 }}
            animate={{ opacity: item.opacity, x: item.drift, rotate: item.rotate }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[640px] flex-col px-4 pb-10 pt-52 sm:px-6">
        <header>


          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="px-2 text-center"
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.45em] text-primary-300">
              {t('simpleTemplate.eventTitle')}
            </p>
            <p className="mx-auto max-w-[420px] text-sm leading-6 text-primary-500/90 sm:text-base">
              {t('simpleTemplate.greeting')}
            </p>
            <p className="mt-10 font-serif text-[2.7rem] italic leading-none text-primary-700 sm:text-5xl">
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
            src="/images/karnay.png"
            alt="Karnay"
            aria-hidden="true"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full object-center select-none mt-10"
          />
        </header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="-mt-8 space-y-6 px-1 sm:px-2"
        >
          <SectionLabel>{t('simpleTemplate.saveTheDate')}</SectionLabel>

          <div className="text-center">
            <p className="font-serif text-3xl italic text-primary-700 sm:text-4xl">
              {monthYear}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {t('simpleTemplate.eventDate')}
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
            <p className="font-serif text-3xl italic text-center text-primary-700 sm:text-4xl">
              {t('simpleTemplate.eventVenue')}
            </p>
            <p className="mt-3 text-base font-semibold leading-7 text-center text-gray-600 sm:text-lg">
              <span>{t('simpleTemplate.startsAt')}</span>
              <span className="font-serif italic text-primary-700 text-3xl block">{startTime}</span>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 mb-32">
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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden">
            <div className="absolute left-1/2 bottom-[-6rem] h-[9rem] w-[18rem] -translate-x-1/2">
              <motion.img
                src="/images/circles.png"
                alt=""
                aria-hidden="true"
                className="absolute left-[-1.5rem] top-4 h-[8.25rem] w-[8.25rem] select-none object-contain"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0,
                }}
              />
              <motion.img
                src="/images/circles.png"
                alt=""
                aria-hidden="true"
                className="absolute left-[4.6rem] top-0 h-[8.25rem] w-[8.25rem] select-none object-contain"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.2,
                }}
              />
              <motion.img
                src="/images/circles.png"
                alt=""
                aria-hidden="true"
                className="absolute left-[10.6rem] top-4 h-[8.25rem] w-[8.25rem] select-none object-contain"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.4,
                }}
              />
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
