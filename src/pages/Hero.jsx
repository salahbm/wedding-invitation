import { Calendar, Clock, Download, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import FloatingHearts from '@/components/shared/FloatingHearts';
import { CountdownTimer } from '@/components/shared/CountDownTimer';
import html2canvas from 'html2canvas';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [guestName, setGuestName] = useState('');
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      backgroundColor: '#ffffff',
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = 'Wedding-Invitation.png';
    link.href = canvas.toDataURL();
    link.click();
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');
    if (guestParam) setGuestName(guestParam);
  }, []);

  return (
    <Fragment>
      <section
        id="home"
        className="flex flex-col items-center justify-center px-4 pt-16 sm:pt-20 w-full text-center relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          className="space-y-10 relative z-10 w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mx-auto"
          >
            <span className="px-4 py-1 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200">
              {t('hero.saveTheDate')}
            </span>
          </motion.div>

          <div className="space-y-6 w-full">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 font-light italic text-base sm:text-lg"
            >
              {t('hero.withJoy')}
            </motion.p>
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl sm:text-4xl md:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600"
            >
              {config.data.groomName} & {config.data.brideName}
            </motion.h2>
          </div>

          {/* 💌 Card with solid background */}
          <motion.div
            ref={cardRef}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="relative max-w-[420px] max-h-[640px] w-full mx-auto rounded-2xl overflow-hidden bg-white border border-rose-100 shadow-lg"
          >
            {/* 👰🏻 Background image */}
            <picture className="absolute inset-0 z-0">
              <img
                src="/images/couple-1.jpeg"
                alt="Background"
                className="w-full h-full object-cover opacity-20"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-rose-100/20 to-white/40" />

            {/* 📝 Card content */}
            <div className="relative px-6 sm:px-10 py-10 sm:py-12 z-10">
              {/* top line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                <div className="w-24 sm:w-36 h-0.5 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              </div>

              <div className="space-y-8 text-center">
                <div className="space-y-6">
                  <h1 className="font-serif text-gray-800">
                    <div className="text-sm sm:text-base text-rose-500 mb-2 font-sans">
                      {t('hero.bismillah')}
                    </div>
                    <div className="text-md mt-2 sm:text-lg mb-1">
                      {t('hero.weddingOf')}
                    </div>
                    <div className="text-3xl sm:text-4xl md:text-5xl mb-2">
                      {config.data.groomName}
                    </div>
                    <div className="text-3xl sm:text-4xl md:text-5xl mb-2">
                      <span className="text-rose-400 mx-2 text-md font-thin">
                        &
                      </span>
                      {config.data.brideName}
                    </div>
                  </h1>

                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4 text-rose-400" />
                    <p className="text-gray-700 font-medium">
                      {formatEventDate(config.data.date, 'full', i18n.language)}
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">
                      {config.data.time}
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-8 sm:w-12 bg-rose-200/70" />
                  <div className="w-2 h-2 rounded-full bg-rose-200" />
                  <div className="h-px w-8 sm:w-12 bg-rose-200/70" />
                </div>

                <div className="space-y-2">
                  <p className="text-gray-500 font-serif italic text-sm">
                    {t('landing.for')}
                  </p>
                  <p className="text-rose-500 font-semibold text-md">
                    {guestName ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t('landing.personalInvitation', {
                            guestName,
                          }),
                        }}
                      />
                    ) : (
                      t('landing.invitation')
                    )}
                  </p>
                </div>
              </div>

              {/* bottom line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                <div className="w-24 sm:w-36 h-0.5 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            className="mt-6 flex mx-auto animate-bounce duration-700 items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            {t('hero.downloadCard') || 'Download Card'}
          </motion.button>

          <CountdownTimer targetDate={config.data.date} />

          <div className="pt-12 relative w-full h-48">
            <div className="absolute inset-0 pointer-events-none z-0">
              <FloatingHearts />
            </div>
            <motion.div
              animate={{
                scale: [1, 1.03, 1.06, 1.03, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart
                className="w-20 sm:w-22 h-20 sm:h-22 text-rose-500 mx-auto"
                fill="currentColor"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Fragment>
  );
}
