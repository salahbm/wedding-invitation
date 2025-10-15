import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const CountdownTimer = ({ targetDate }) => {
  const { t } = useTranslation();

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target.getTime() - now.getTime();
    const absDiff = Math.abs(difference);

    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((absDiff / 1000 / 60) % 60);
    const seconds = Math.floor((absDiff / 1000) % 60);

    if (difference > 0) {
      // Future event → countdown
      return {
        label: t('countdown.untilWedding', 'Until the wedding'),
        values: {
          [t('countdown.days')]: days,
          [t('countdown.hours')]: hours,
          [t('countdown.minutes')]: minutes,
          [t('countdown.seconds')]: seconds,
        },
      };
    } else {
      // Past event → count up
      return {
        label: t('countdown.sinceWedding', 'Since the wedding'),
        values: {
          [t('countup.days')]: days,
          [t('countup.hours')]: hours,
          [t('countup.minutes')]: minutes,
          [t('countup.seconds')]: seconds,
        },
      };
    }
  }, [targetDate, t]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="mt-8">
      <h3 className="text-center text-rose-600 font-semibold mb-4">
        {timeLeft.label}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(timeLeft.values).map((interval) => (
          <motion.div
            key={interval}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100 shadow-sm"
          >
            <span className="text-xl sm:text-2xl font-bold text-rose-600">
              {timeLeft.values[interval]}
            </span>
            <span className="text-xs text-gray-500 capitalize">{interval}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  targetDate: PropTypes.string.isRequired,
};
