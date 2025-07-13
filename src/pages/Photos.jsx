import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ChevronDown, X, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';
import Parents from '@/components/shared/Parents';

export default function LoveStory() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const timelineRef = useRef(null);
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [columns, setColumns] = useState(4);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  // Define stories with translations
  const stories = useMemo(
    () => [
      {
        title: t('loveStory.babyGroom.title'),
        subtitle: t('loveStory.babyGroom.subtitle'),
        year: t('loveStory.babyGroom.year'),
        image: '/images/story/me-young.jpg',
        align: 'left',
        emoji: '👶🏻',
        type: 'single',
      },
      {
        title: t('loveStory.babyBride.title'),
        subtitle: t('loveStory.babyBride.subtitle'),
        year: t('loveStory.babyBride.year'),
        image: '/images/story/her-young.jpg',
        align: 'right',
        emoji: '👼🏻',
        type: 'single',
      },
      {
        title: t('loveStory.grewUp.title'),
        subtitle: t('loveStory.grewUp.subtitle'),
        year: t('loveStory.grewUp.year'),
        image: '/images/story/me-adult.jpg',
        secondImage: '/images/story/her-adult.jpg', // Add second image for grew up
        align: 'center',
        emoji: '🌱',
        type: 'double', // Two separate images for him and her
      },
      {
        title: t('loveStory.met.title'),
        subtitle: t('loveStory.met.subtitle'),
        year: t('loveStory.met.year'),
        image: '/images/story/meet.jpg',
        align: 'meet', // Changed to center as requested
        emoji: '☕️',
        type: 'single',
      },
      {
        title: t('loveStory.engaged.title'),
        subtitle: t('loveStory.engaged.subtitle'),
        year: t('loveStory.engaged.year'),
        image: '/images/story/engaged.jpg',
        align: 'center', // Changed to center as requested
        emoji: '💍',
        type: 'single',
      },
    ],
    [t]
  );

  useEffect(() => setMounted(true), []);

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(2);
      } else if (window.innerWidth < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hover: { scale: 1.05, rotate: 2 },
  };

  return (
    <section id="photos" className="py-16 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-300" />
        <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full bg-rose-200" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-rose-100" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-rose-500 font-medium inline-block mb-2"
          >
            {t('loveStory.subtitle')}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif text-gray-800 mb-4"
          >
            {t('loveStory.title')}
          </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-rose-200" />
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <div className="h-px w-12 bg-rose-200" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 max-w-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: t('loveStory.description') }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
            onClick={scrollToGallery}
          >
            <button className="text-rose-500 flex items-end mx-auto group cursor-pointer">
              <span className="mr-2 group-hover:underline">
                {t('loveStory.skipToGallery')}
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Background deco */}
          <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none z-0">
            <div className="absolute top-10 left-10 w-60 h-60 bg-rose-200 rounded-full blur-3xl" />
            <div className="absolute top-10 left-10 w-60 h-60 bg-rose-100 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-100 rounded-full blur-2xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-100 rounded-full blur-2xl" />
          </div>
          {/* Timeline line - visible on all screens */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-rose-100 via-rose-300 to-rose-100 -z-10" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            className="space-y-24 relative"
          >
            {stories.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  `flex flex-col ${item.align === 'center' ? 'items-center' : ''} md:items-start relative`
                )}
              >
                {/* Timeline dot - visible on all screens */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 aspect-square rounded-full bg-white border-2 border-rose-400 flex items-center justify-center shadow-md">
                  <span>{item.emoji}</span>
                </div>

                {/* Content */}
                <div
                  className={cn(
                    'flex flex-col gap-8 w-full items-center md:px-12',
                    item.align === 'center'
                      ? 'md:items-center md:justify-center'
                      : '',
                    item.align === 'right'
                      ? 'md:flex-row-reverse md:justify-between'
                      : '',
                    item.align === 'left'
                      ? 'md:flex-row md:justify-between'
                      : ''
                  )}
                >
                  {/* Year badge - visible only on mobile */}
                  <div className="md:hidden bg-rose-100 text-rose-600 mt-10 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {item.year}
                  </div>

                  {/* Image container(s) */}
                  {item.type === 'single' ? (
                    <motion.div
                      className={cn(
                        `relative w-64 h-80 rounded-xl overflow-hidden shadow-lg border-4 border-white`,
                        item.align === 'center' ? 'md:mt-12' : '',
                        item.align === 'meet' ? 'md:mt-12 w-90' : ''
                      )}
                      whileHover="hover"
                      variants={imageVariants}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <div className="text-xs font-medium mb-1">
                            {item.year}
                          </div>
                          <div className="font-serif text-xl">{item.title}</div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-x-12 gap-y-6">
                      {/* His image */}
                      <motion.div
                        className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg border-4 border-white"
                        whileHover="hover"
                        variants={imageVariants}
                      >
                        <img
                          src={item.image}
                          alt={`${item.title} - Him`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <div className="text-xs font-medium mb-1">
                              {item.year}
                            </div>
                            <div className="font-serif text-xl">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Her image */}
                      <motion.div
                        className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg border-4 border-white"
                        whileHover="hover"
                        variants={imageVariants}
                      >
                        <img
                          src={item.secondImage}
                          alt={`${item.title} - Her`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <div className="text-xs font-medium mb-1">
                              {item.year}
                            </div>
                            <div className="font-serif text-xl">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Text content */}
                  <div
                    className={cn(
                      'max-w-xs bg-white/80',
                      item.align === 'center' ? 'text-center' : '',
                      item.align === 'right' ? 'md:text-right' : '',
                      item.align === 'left' ? 'md:text-left' : ''
                    )}
                  >
                    {/* Year badge - visible only on desktop */}
                    <div className="hidden md:inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {item.year}
                    </div>

                    <h3 className="text-2xl font-serif text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.subtitle}</p>

                    <div className="mt-4 h-0.5 w-12 bg-rose-200 mx-auto md:mx-0 md:ml-0 md:mr-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Final Chapter - Photo Gallery */}
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: stories.length * 0.1 }}
          className="mt-32 text-center"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={mounted ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: stories.length * 0.1 + 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-2">
              {t('loveStory.newChapter')}
            </h2>
            <p className="text-gray-600 mb-8">{t('loveStory.lifetime')}</p>
          </motion.div>

          {/* College-style photo gallery */}
          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3 md:gap-4">
                  {[...Array(visibleCount)]
                    .filter((_, index) => index % columns === colIndex)
                    .map((_, index) => {
                      // Calculate the actual image index
                      const imageIndex = colIndex + index * columns;
                      if (imageIndex >= visibleCount) return null; // Don't render if we've exceeded our images

                      // Randomize sizes for more dynamic college-style layout
                      const isLarge = Math.random() > 0.7;
                      const aspectRatio =
                        Math.random() > 0.5 ? 'aspect-square' : 'aspect-[3/4]';

                      return (
                        <motion.div
                          key={`${colIndex}-${index}`}
                          className={`relative ${isLarge ? 'row-span-2' : ''} ${aspectRatio} overflow-hidden group rounded-xl shadow-md border-2 border-white`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={mounted ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            delay:
                              imageIndex < 4
                                ? stories.length * 0.1 + imageIndex * 0.1
                                : 0.1 * (imageIndex % 4),
                          }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          onClick={() => {
                            setSelectedImage(
                              `/images/story/${imageIndex + 1}.jpg`
                            );
                            document.body.style.overflow = 'hidden';
                          }}
                        >
                          <img
                            src={`/images/story/${imageIndex + 1}.jpg`}
                            alt={`Memory ${imageIndex + 1}`}
                            className="w-full h-full object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="p-4 text-white text-center">
                              <Heart className="w-6 h-6 mx-auto mb-2 fill-white" />
                              <p className="font-serif">
                                {t('loveStory.memory')} {imageIndex + 1}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {visibleCount < 11 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    setLoading(true);
                    setVisibleCount((prev) => Math.min(prev + 4, 11));
                    setLoading(false);
                  }}
                  disabled={loading}
                  className={`px-6 py-3 bg-rose-500 text-white rounded-md shadow hover:bg-rose-600 transition-all duration-300 flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Enlarged image view */}
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={() => {
                setSelectedImage(null);
                document.body.style.overflow = 'auto';
              }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 text-white text-xl p-2 z-10"
                  onClick={() => {
                    setSelectedImage(null);
                    document.body.style.overflow = 'auto';
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="relative w-full h-[80vh]">
                  <img
                    src={selectedImage}
                    alt="Enlarged view"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* PARENTS */}
      <Parents />
    </section>
  );
}
