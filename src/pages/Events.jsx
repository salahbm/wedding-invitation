import EventCards from '@/components/shared/EventsCard';
import config from '@/config/config';
import { motion } from 'framer-motion';
import { Clock, GlassWater, Heart, Music, PartyPopper } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function Events() {
  const { t } = useTranslation();

  const timelineEvents = useMemo(
    () => [
      {
        time: '18:00',
        event: t('table.guestArrival'),
        description: t('table.arrivalDesc'),
        icon: GlassWater,
      },
      {
        event: t('table.artistAmir'),
        description: t('table.artistAmirDesc'),
        icon: Music,
      },
      {
        event: t('table.artistJasmin'),
        description: t('table.artistJasminDesc'),
        icon: Music,
      },
      {
        event: t('table.danceShow'),
        description: t('table.danceShowDesc'),
        icon: PartyPopper,
      },
      {
        event: t('table.artistTohir'),
        description: t('table.artistTohirDesc'),
        icon: Music,
      },
      {
        event: t('table.danceShowAgain'),
        description: t('table.danceShowAgainDesc'),
        icon: PartyPopper,
      },
      {
        event: t('table.artistJBella'),
        description: t('table.artistJBellaDesc'),
        icon: Music,
      },
      {
        event: t('table.danceShowFinal'),
        description: t('table.danceShowFinalDesc'),
        icon: PartyPopper,
      },
    ],
    [t]
  );

  return (
    <>
      <section id="event" className="relative overflow-hidden px-4 pb-8 pt-4 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-7 text-center sm:mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500 sm:text-sm">
              {t('events.saveTheDate')}
            </span>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 sm:text-base">
              {t('events.invitation')}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-primary-300">
              <span className="h-px w-10 bg-primary-200" />
              <Heart className="h-3.5 w-3.5" fill="currentColor" />
              <span className="h-px w-10 bg-primary-200" />
            </div>
          </div>

          <EventCards events={config.data.agenda} />
        </motion.div>
      </section>

      <section id="table" className="relative overflow-hidden px-4 py-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/45 to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center sm:mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500 sm:text-sm">
              {t('table.weddingSchedule')}
            </span>
            <h2 className="mt-2 font-serif text-3xl text-gray-800 sm:text-5xl">
              {t('table.timetable')}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3 text-primary-400">
              <span className="h-px w-10 bg-primary-200" />
              <Clock className="h-4 w-4" />
              <span className="h-px w-10 bg-primary-200" />
            </div>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
              {t('table.message')}
            </p>
          </motion.header>

          <ol className="relative">
            {timelineEvents.map((event, index) => {
              const EventIcon = event.icon;
              const isLast = index === timelineEvents.length - 1;

              return (
                <motion.li
                  key={`${event.event}-${index}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
                  className="relative flex gap-3 pb-3.5 sm:gap-5 sm:pb-5"
                >
                  {!isLast && (
                    <span className="absolute bottom-0 left-5 top-10 w-px bg-gradient-to-b from-primary-300 to-primary-100 sm:left-6 sm:top-12" />
                  )}

                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary-50 text-primary-500 shadow-sm ring-1 ring-primary-100 sm:h-12 sm:w-12">
                    <EventIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div className="min-w-0 flex-1 rounded-2xl border border-primary-100/80 bg-white/90 px-4 py-3 shadow-[0_8px_28px_hsl(var(--black)_/_0.05)] backdrop-blur-sm sm:px-5 sm:py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-400">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {event.time && (
                            <span className="rounded-full bg-primary-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-primary-600">
                              {event.time}
                            </span>
                          )}
                        </div>
                        <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                          {event.event}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
