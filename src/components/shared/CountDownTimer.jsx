import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const CountdownTimer = ({ targetDate }) => {
  const { t } = useTranslation();
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        [t('countdown.days')]: Math.floor(difference / (1000 * 60 * 60 * 24)),
        [t('countdown.hours')]: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        [t('countdown.minutes')]: Math.floor((difference / 1000 / 60) % 60),
        [t('countdown.seconds')]: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate, t]); // t is from context and doesn't need to be in the dependency array

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
      {Object.keys(timeLeft).map((interval) => (
        <motion.div
          key={interval}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
        >
          <span className="text-xl sm:text-2xl font-bold text-rose-600">
            {timeLeft[interval]}
          </span>
          <span className="text-xs text-gray-500 capitalize">{interval}</span>
        </motion.div>
      ))}
    </div>
  );
};

CountdownTimer.propTypes = {
  targetDate: PropTypes.string.isRequired,
};
