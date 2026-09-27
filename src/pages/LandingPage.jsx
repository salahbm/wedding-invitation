// src/pages/LandingPage.jsx
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, Globe, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const LandingPage = ({ onOpenInvitation }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const openTimerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Available languages
  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'uz', name: t('language.uz') },
    { code: 'ru', name: t('language.ru') },
  ];

  // Change language handler
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setShowLanguageModal(false);
  };

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    openTimerRef.current = window.setTimeout(
      onOpenInvitation,
      shouldReduceMotion ? 180 : 1150
    );
  };

  useEffect(
    () => () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    },
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen relative overflow-hidden flex flex-col justify-center"
    >
      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-xl"
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Globe className="w-10 h-10 text-primary-500" />
              </div>
              <h2 className="text-2xl font-serif text-gray-800 mb-2">
                {t('language.selectLanguage') || 'Select Language'}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('language.selectPreferred') ||
                  'Please select your preferred language'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => changeLanguage(language.code)}
                  className={cn(
                    'py-3 px-4 rounded-xl border text-center transition-all',
                    i18n.language === language.code
                      ? 'border-primary-400 bg-primary-50 text-primary-600 font-medium'
                      : 'border-gray-200 hover:border-primary-200 hover:bg-primary-50/50'
                  )}
                >
                  {language.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white" />
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-primary-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      {/* Main Content */}
      <div className="relative z-10  flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Card Container */}
          <div className="backdrop-blur-sm bg-white/50 p-6 sm:p-8 md:p-10 rounded-2xl border border-primary-100/50 shadow-xl">
            {/* Top Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <div className="h-px w-12 sm:w-16 bg-primary-200/50" />
              <div className="w-2 h-2 rounded-full bg-primary-300" />
              <div className="h-px w-12 sm:w-16 bg-primary-200/50" />
            </div>

            {/* Date and Time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 mb-6 sm:mb-8 items-center"
            >
              <div className="inline-flex flex-col items-center space-y-1 bg-white/80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
                <Calendar className="w-5 h-5 text-primary-400" />
                <p className="text-gray-700 font-medium capitalize">
                  {formatEventDate(config.data.date, 'full', i18n.language)}
                </p>
              </div>

              <div className="inline-flex flex-col items-center space-y-1 bg-white/80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
                <Clock className="w-5 h-5 text-primary-400" />
                <p className="text-gray-700 font-medium">{config.data.time}</p>
              </div>
            </motion.div>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
                  {config.data.groomName}
                </h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 leading-tight border-b pb-4 border-primary-200">
                  <span className="text-primary-400 mx-2 sm:mx-3">&</span>
                  {config.data.brideName}
                </h1>
              </div>
            </motion.div>
            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center py-4 font-thin"
            >
              <p className="text-sm text-gray-500 font-thin">
                {t('landing.78')}
              </p>
            </motion.div>

            {/* Open Invitation Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 sm:mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenInvitation}
                disabled={isOpening}
                className="group relative w-full overflow-hidden rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-primary-600 disabled:cursor-wait sm:px-8 sm:py-3"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{t('landing.openInvitation')}</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            </motion.div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {t('landing.clickForMore')}
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] overflow-hidden bg-[#fffaf7]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1.04, 1.08] }}
                transition={{ duration: 1.05, times: [0, 0.2, 0.72, 1] }}
                className="relative z-10 text-center"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-500">
                  {t('landing.invitation')}
                </p>
                <p className="mt-3 font-serif text-3xl text-gray-800 sm:text-5xl">
                  {config.data.groomName}
                  <span className="mx-2 text-primary-400">&</span>
                  {config.data.brideName}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: shouldReduceMotion ? 0 : '-105%' }}
              transition={{ delay: 0.35, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 left-0 z-20 w-1/2 border-r border-primary-100 bg-gradient-to-r from-[#fffaf7] to-primary-50"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: shouldReduceMotion ? 0 : '105%' }}
              transition={{ delay: 0.35, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-y-0 right-0 z-20 w-1/2 border-l border-primary-100 bg-gradient-to-l from-[#fffaf7] to-primary-50"
            />

            <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1.08, 0.3] }}
                transition={{ duration: 0.82, times: [0, 0.2, 0.58, 1] }}
                className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-primary-500 text-white shadow-[0_12px_45px_hsl(var(--primary)_/_0.35)]"
              >
                <Heart className="h-8 w-8" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

LandingPage.propTypes = {
  onOpenInvitation: PropTypes.func.isRequired,
};

export default LandingPage;
