import EventCards from '@/components/EventsCard';
import config from '@/config/config';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  Music,
  Utensils,
  GlassWater,
  PartyPopper,
  HeartHandshake,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
export default function Events() {
  const { t } = useTranslation();

  const [hasAnimated, setHasAnimated] = useState(false);

  // Wedding timeline events
  const timelineEvents = useMemo(
    () => [
      {
        time: '19:30',
        event: t('table.guestArrival'),
        description: t('table.arrivalDesc'),
        icon: <GlassWater className="w-full h-full text-rose-500" />,
      },
      {
        time: '19:45',
        event: t('table.entrance'),
        description: t('table.entranceDesc'),
        icon: <HeartHandshake className="w-full h-full text-rose-500" />,
      },
      {
        time: '20:00',
        event: t('table.firstCourse'),
        description: t('table.firstCourseDesc'),
        icon: <Utensils className="w-full h-full text-rose-500" />,
      },
      {
        time: '20:45',
        event: t('table.mainCourse'),
        description: t('table.mainCourseDesc'),
        icon: <Utensils className="w-full h-full text-rose-500" />,
      },
      {
        time: '21:30',
        event: t('table.dance'),
        description: t('table.danceDesc'),
        icon: <Music className="w-full h-full text-rose-500" />,
      },
      {
        time: '22:15',
        event: t('table.games'),
        description: t('table.gamesDesc'),
        icon: <PartyPopper className="w-full h-full text-rose-500" />,
      },
      {
        time: '23:00',
        event: t('table.waltz'),
        description: t('table.waltzDesc'),
        icon: <Music className="w-full h-full text-rose-500" />,
      },
      {
        time: '23:30',
        event: t('table.celebration'),
        description: t('table.celebrationDesc'),
        icon: <PartyPopper className="w-full h-full text-rose-500" />,
      },
    ],
    [t]
  );

  // Set animation to run once on component mount
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <>
      {/* Event Section */}
      <section id="event" className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 py-10"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium mb-2"
            >
              {t('events.saveTheDate')}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
            >
              {t('events.weddingEvents')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 max-w-md mx-auto"
            >
              {t('events.invitation')}
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <div className="text-rose-400">
                <Heart className="w-4 h-4" fill="currentColor" />
              </div>
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <EventCards events={config.data.agenda} />
          </motion.div>
        </motion.div>
      </section>
      <section id="table" className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-10 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              {t('table.weddingSchedule')}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              {t('table.timetable')}
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              animate={hasAnimated ? { scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <Clock className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>

            {/* Message Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={hasAnimated ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-4 max-w-md mx-auto"
            >
              {/* Main Message */}
              <p className="text-gray-600 leading-relaxed">
                {t('table.message')}
              </p>

              <p className="text-gray-600 italic text-sm">
                {t('table.thankYou')}
              </p>
            </motion.div>

            {/* Optional: Additional Decorative Element */}
            <motion.div
              initial={{ scale: 0 }}
              animate={hasAnimated ? { scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 pt-4"
            >
              <div className="h-px w-8 bg-rose-200/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
              <div className="h-px w-8 bg-rose-200/50" />
            </motion.div>
          </motion.div>

          {/* Timeline Header */}
          <div className="max-w-2xl mx-auto mb-6 md:grid grid-cols-12 gap-6 px-4 text-gray-500 font-medium hidden">
            <div className="col-span-3 text-left">{t('table.timeHeader')}</div>
            <div className="col-span-3 text-left">{t('table.eventHeader')}</div>
            <div className="col-span-6 text-left">
              {t('table.descriptionHeader')}
            </div>
          </div>

          {/* Timeline Events */}
          <div className="max-w-2xl mx-auto grid gap-6">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * index + 0.7 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                  {/* Desktop layout (md and up) */}
                  <div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center">
                    <div className="col-span-3 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-white p-2 shadow-sm flex-shrink-0">
                        {event.icon}
                      </div>
                      <span className="font-mono text-gray-800 font-medium">
                        {event.time}
                      </span>
                    </div>

                    <div className="col-span-3">
                      <h3 className="font-medium text-gray-800">
                        {event.event}
                      </h3>
                    </div>

                    <div className="col-span-6">
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  {/* Mobile layout (smaller than md) */}
                  <div className="md:hidden space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-white p-2 shadow-sm flex-shrink-0">
                          {event.icon}
                        </div>
                        <h3 className="font-medium text-gray-800">
                          {event.event}
                        </h3>
                      </div>
                      <span className="font-mono text-gray-800 font-medium">
                        {event.time}
                      </span>
                    </div>

                    <div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
