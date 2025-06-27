import config from '@/config/config';
import {
  Clock,
  MapPin,
  CalendarCheck,
  ExternalLink,
  Navigation,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatEventDate } from '@/lib/formatEventDate';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

export default function Location() {
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const videoRef = useRef(null);
  const mapContainerRef = useRef(null);
  const detailsContainerRef = useRef(null);

  // Function to ensure equal heights for map and details containers
  useEffect(() => {
    const adjustHeights = () => {
      if (mapContainerRef.current && detailsContainerRef.current) {
        // Reset heights first
        mapContainerRef.current.style.height = 'auto';
        detailsContainerRef.current.style.height = 'auto';

        // Get the heights
        const mapHeight = mapContainerRef.current.offsetHeight;
        const detailsHeight = detailsContainerRef.current.offsetHeight;

        // Set both to the larger height
        const maxHeight = Math.max(mapHeight, detailsHeight);
        mapContainerRef.current.style.height = `${maxHeight}px`;
        detailsContainerRef.current.style.height = `${maxHeight}px`;
      }
    };

    // Adjust on load and window resize
    adjustHeights();
    window.addEventListener('resize', adjustHeights);

    return () => {
      window.removeEventListener('resize', adjustHeights);
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const hideVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsVideoVisible(false);
    }
  };

  const showVideo = () => {
    setIsVideoVisible(true);
  };
  return (
    <>
      {/* Location section */}
      <section id="location" className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block text-rose-500 font-medium"
            >
              {t('location.eventVenue')}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              {t('location.title')}
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <MapPin className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Location Content */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Map Container */}
            <motion.div
              ref={mapContainerRef}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white flex"
            >
              <iframe
                src={config.data.maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </motion.div>

            {/* Venue Details */}
            <motion.div
              ref={detailsContainerRef}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 h-full flex flex-col"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full flex flex-col justify-between">
                <h3 className="text-2xl font-serif text-gray-800 mb-6">
                  {config.data.location}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                    <p className="text-gray-600 flex-1">
                      {config.data.address}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <CalendarCheck className="w-5 h-5 text-rose-500" />
                    <p className="text-gray-600">
                      {formatEventDate(config.data.date, 'full', i18n.language)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5 text-rose-500" />
                    <p className="text-gray-600">{config.data.time}</p>
                  </div>

                  {/* Action Button - Full Width */}
                  <div className="pt-4">
                    <motion.a
                      href={config.data.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      viewport={{ once: true }}
                      className="w-full flex items-center justify-center gap-1.5 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="font-semibold">
                        {t('location.viewMap')}
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-16 text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-block text-rose-500 font-medium"
              >
                {t('location.howToReach')}
              </motion.span>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-serif text-gray-800"
              >
                {t('location.directionVideo')}
              </motion.h3>

              {/* Decorative Divider */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-4 pt-2"
              >
                <div className="h-[1px] w-12 bg-rose-200" />
                <Navigation className="w-5 h-5 text-rose-400" />
                <div className="h-[1px] w-12 bg-rose-200" />
              </motion.div>
            </div>

            {/* Video Section - Conditionally rendered */}
            {isVideoVisible ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border-8 border-white group"
                style={{ maxHeight: '70vh', height: '500px' }}
              >
                {/* Close button */}
                <button
                  onClick={hideVideo}
                  className="absolute top-2 right-2 z-20 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
                  aria-label={t('location.closeVideo')}
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                <video
                  ref={videoRef}
                  className="w-full h-full object-contain bg-black"
                  poster="/images/video-thumbnail.jpg"
                  preload="metadata"
                  controlsList="nodownload"
                >
                  <source src="/video/wedding-hall.mp4" type="video/mp4" />
                  {t('location.videoNotSupported')}
                </video>

                {/* Play/Pause Button Overlay */}
                <div
                  onClick={togglePlayPause}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"
                >
                  <div
                    className={`${isPlaying ? 'opacity-0' : 'opacity-100'} group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-80 p-5 rounded-full`}
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-rose-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-rose-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Video Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white text-left">
                  <p className="text-sm md:text-base font-medium">
                    {t('location.videoCaption')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl overflow-hidden shadow-lg border-8 border-white relative cursor-pointer"
                onClick={showVideo}
              >
                <div className="relative">
                  <img
                    src="/images/video-thumbnail.jpg"
                    alt={t('location.videoThumbnailAlt')}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 p-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-rose-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-serif text-lg text-gray-800">
                    {t('location.watchDirections')}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('location.clickToWatch')}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Video Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              {t('location.videoDescription')}
            </motion.p>

            {/* Video Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              className="text-sm text-gray-500 max-w-2xl mx-auto italic"
            >
              {t('location.videoInstructions')}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
