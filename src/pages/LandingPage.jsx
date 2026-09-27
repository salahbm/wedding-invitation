import config from "@/config/config";
import { formatEventDate } from "@/lib/formatEventDate";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const LandingPage = ({ onOpenInvitation }) => {
  const { t, i18n } = useTranslation();
  const [isOpening, setIsOpening] = useState(false);
  const openTimerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    openTimerRef.current = window.setTimeout(
      onOpenInvitation,
      shouldReduceMotion ? 180 : 1150,
    );
  };

  useEffect(() => () => window.clearTimeout(openTimerRef.current), []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
      className="welcome-screen relative isolate flex min-h-svh flex-col overflow-hidden text-white"
      aria-labelledby="couple-names"
    >
      <img
        src="/images/hero.jpg"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="welcome-shade absolute inset-0 -z-10" />

      <div className="mx-auto flex min-h-svh w-full max-w-xl flex-1 flex-col items-center px-6 pb-8 pt-28 text-center sm:px-12 sm:pb-12">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/90">
          {t("landing.invitation")}
        </p>
        <div className="flex flex-1 flex-col items-center justify-center py-10 sm:py-12">
          <h1
            id="couple-names"
            className="welcome-names font-serif font-normal tracking-tight"
          >
            <span className="block">{config.data.groomName}</span>
            <span className="my-2 block text-3xl italic text-[#e8d6bd]">&</span>
            <span className="block">{config.data.brideName}</span>
          </h1>
          <div className="my-6 h-px w-12 bg-white/50" aria-hidden="true" />
          <p className="max-w-xs font-serif text-sm italic leading-relaxed text-white/90">
            {t("landing.78")}
          </p>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-6 space-y-2 text-sm">
            <p className="capitalize tracking-wide">
              {formatEventDate(config.data.date, "full", i18n.language)}
            </p>
            <p className="text-white/80">
              {config.data.time}
              <span className="mx-3" aria-hidden="true">
                ·
              </span>
              {config.data.location}
            </p>
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenInvitation}
            disabled={isOpening}
            className="group flex min-h-14 w-full items-center justify-center gap-4 rounded-full border border-white/40 bg-[#f7f2e9] px-6 py-4 text-sm font-medium text-[#392f2b] shadow-lg transition-colors hover:bg-white disabled:cursor-wait"
          >
            {t("landing.openInvitation")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.button>
        </div>
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
                  {t("landing.invitation")}
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
              animate={{ x: shouldReduceMotion ? 0 : "-105%" }}
              transition={{
                delay: 0.35,
                duration: 0.72,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-y-0 left-0 z-20 w-1/2 border-r border-primary-100 bg-gradient-to-r from-[#fffaf7] to-primary-50"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: shouldReduceMotion ? 0 : "105%" }}
              transition={{
                delay: 0.35,
                duration: 0.72,
                ease: [0.76, 0, 0.24, 1],
              }}
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
    </motion.section>
  );
};

LandingPage.propTypes = { onOpenInvitation: PropTypes.func.isRequired };
export default LandingPage;
