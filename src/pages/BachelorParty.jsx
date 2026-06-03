import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, PartyPopper, Music, PauseCircle, PlayCircle, Shirt, Utensils, Flame } from 'lucide-react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useMusic from '@/hooks/music/useMusic';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center min-w-[48px]">
    <span className="text-2xl sm:text-3xl font-bold text-primary-400 font-mono">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
      {label}
    </span>
  </div>
);

CountdownUnit.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

function Countdown({ targetDate }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate + 'T19:00:00');
    const update = () => {
      const now = new Date();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      <CountdownUnit value={timeLeft.days} label={t('bachelor.days')} />
      <span className="text-primary-500/50 text-lg">:</span>
      <CountdownUnit value={timeLeft.hours} label={t('bachelor.hours')} />
      <span className="text-primary-500/50 text-lg">:</span>
      <CountdownUnit value={timeLeft.minutes} label={t('bachelor.minutes')} />
      <span className="text-primary-500/50 text-lg">:</span>
      <CountdownUnit value={timeLeft.seconds} label={t('bachelor.seconds')} />
    </div>
  );
}

Countdown.propTypes = {
  targetDate: PropTypes.string.isRequired,
};

export default function BachelorParty() {
  const { t, i18n } = useTranslation();
  const { isPlaying, showToast, toggleMusic, audioTitle } = useMusic();
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('guest');
    if (guest) setGuestName(guest);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative py-16 px-4">
      {/* Language Switcher */}
      <div className="fixed top-4 left-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Music Control */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-border"
      >
        {isPlaying ? (
          <div className="relative">
            <PauseCircle className="w-5 h-5 text-primary-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        ) : (
          <PlayCircle className="w-5 h-5 text-primary-500" />
        )}
      </motion.button>

      {/* Music Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-card/90 text-foreground px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2 border border-border">
              <Music className="w-4 h-4 animate-pulse text-primary-500" />
              <span className="text-sm whitespace-nowrap">{audioTitle}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md space-y-6"
      >
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
          >
            <PartyPopper className="w-12 h-12 text-primary-500 mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-serif text-foreground"
          >
            {t('bachelor.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-sm italic"
          >
            {t('bachelor.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-primary-400 font-medium text-xs uppercase tracking-widest"
          >
            {t('bachelor.coupleNames', { groomName: config.data.groomName, brideName: config.data.brideName })}
          </motion.p>
        </section>

        {/* Guest Greeting */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-2"
          >
            <p className="text-muted-foreground text-xs uppercase tracking-wider">{t('bachelor.greetingPrefix')}</p>
            <p className="text-primary-400 font-bold text-xl mt-1">{guestName}</p>
          </motion.div>
        )}

        {/* Invitation Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-center text-foreground/75 leading-relaxed text-sm sm:text-base"
        >
          {t('bachelor.invitationText')}
        </motion.p>

        {/* Event Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-foreground font-medium capitalize">
                {formatEventDate(config.data.date, 'full', i18n.language)}
              </p>
              <p className="text-muted-foreground text-xs">12.06.2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-foreground font-medium">{config.data.time}</p>
              <p className="text-muted-foreground text-xs">{t('bachelor.start')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-foreground font-medium">{config.data.location}</p>
              <p className="text-muted-foreground text-xs">{config.data.address}</p>
            </div>
          </div>
        </motion.div>

        {/* Dress Code */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-card rounded-2xl border border-border p-6 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
            <Shirt className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <p className="text-foreground font-medium">{t('bachelor.dressCode')}</p>
            <p className="text-muted-foreground text-xs">{t('bachelor.dressCodeValue')}</p>
          </div>
        </motion.div>

        {/* Schedule Mini-Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-4"
        >
          <p className="text-foreground font-medium text-sm uppercase tracking-wider text-center">
            {t('bachelor.schedule')}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">19:00</span>
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <div className="flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-primary-400" />
                <span className="text-foreground text-sm">{t('bachelor.gathering')}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">20:00</span>
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <div className="flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-primary-400" />
                <span className="text-foreground text-sm">{t('bachelor.dinner')}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">22:00</span>
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <div className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-primary-400" />
                <span className="text-foreground text-sm">{t('bachelor.party')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-3"
        >
          <p className="text-center text-muted-foreground text-xs uppercase tracking-widest">
            {t('bachelor.countdownLabel')}
          </p>
          <Countdown targetDate={config.data.date} />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-1 pt-4 pb-8"
        >
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
            {t('bachelor.from')}
          </p>
          <p className="text-foreground font-serif text-2xl">
            {config.data.groomName} & {config.data.brideName}
          </p>
          <p className="text-muted-foreground text-sm">
            {t('bachelor.footer')} 🤝
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
