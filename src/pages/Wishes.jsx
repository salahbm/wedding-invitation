import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import Marquee from '@/components/ui/marquee';
import {
  Calendar,
  Clock,
  ChevronDown,
  User,
  MessageCircle,
  Send,
  Smile,
  CheckCircle,
  XCircle,
  HelpCircle,
  ScrollText,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';
import { useTranslation } from 'react-i18next';

export default function Wishes() {
  const { t, i18n } = useTranslation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [newWish, setNewWish] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendance, setAttendance] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wishesContainerRef = useRef(null);

  const options = [
    { value: 'attending', label: t('wishes.attending') },
    { value: 'not-attending', label: t('wishes.notAttending') },
    { value: 'maybe', label: t('wishes.maybe') },
  ];

  // Fetch wishes from SheetDB API
  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://sheetdb.io/api/v1/f36xx8efcnu8x');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Sort wishes by timestamp, newest first
        const sortedWishes = data.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setWishes(sortedWishes);
        setError(null);
      } catch (err) {
        console.error('Error fetching wishes:', err);
        setError(t('wishes.fetchError'));
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, [t]);

  // Reset form after successful submission
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmitWish = async (e) => {
    e.preventDefault();

    // Form validation
    if (!guestName.trim() || !newWish.trim() || !attendance) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare data for SheetDB
    const timestamp = new Date().toISOString();
    const wishData = {
      name: guestName.trim(),
      message: newWish.trim(),
      attendance: attendance,
      timestamp: timestamp,
    };

    try {
      // Send data to SheetDB API
      const response = await fetch('https://sheetdb.io/api/v1/f36xx8efcnu8x', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Add to local state for immediate display
      const newWishObj = {
        id: `temp-${Date.now()}`,
        name: guestName,
        message: newWish,
        attending: attendance, // Note: this is 'attending' for display but 'attendance' for API
        timestamp: timestamp,
      };

      setWishes((prev) => [newWishObj, ...prev]);

      // Scroll to top of wishes container to show new wish
      if (wishesContainerRef.current) {
        wishesContainerRef.current.scrollTop = 0;
      }

      // Reset form
      setGuestName('');
      setNewWish('');
      setAttendance('');
      setSubmitStatus('success');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Error submitting wish:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'attending':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'not-attending':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case 'maybe':
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };
  return (
    <>
      <section id="wishes" className="min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              {t('wishes.sendYourBestWishes')}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              {t('wishes.title')}
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <MessageCircle className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Wishes List - Marquee */}
          <div className="max-w-2xl mx-auto space-y-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-rose-600">{error}</div>
            ) : wishes.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                {t('wishes.noWishes')}
              </div>
            ) : (
              <>
                <AnimatePresence>
                  <Marquee
                    speed={20}
                    gradient={false}
                    pauseOnHover={true}
                    pauseOnClick={true}
                    className="[--duration:20s] py-2"
                  >
                    {wishes.map((wish, index) => (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative w-[300px] mx-2"
                      >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                        {/* Card content */}
                        <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md max-h-[140px] overflow-y-auto flex flex-col">
                          {/* Header */}
                          <div className="flex items-start space-x-3 mb-2">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                {wish.name[0].toUpperCase()}
                              </div>
                            </div>

                            {/* Name, Time, and Attendance */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-gray-800 text-sm truncate">
                                  {wish.name}
                                </h4>
                                {getAttendanceIcon(
                                  wish.attending || wish.attendance
                                )}
                              </div>
                              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                <Clock className="w-3 h-3" />
                                <time className="truncate">
                                  {formatEventDate(
                                    wish.timestamp,
                                    'short',
                                    i18n.language
                                  )}
                                </time>
                              </div>
                            </div>
                          </div>

                          {/* Message */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-2  flex-grow">
                            {wish.message}
                          </p>

                          {/* Optional: Time indicator for recent messages */}
                          {Date.now() - new Date(wish.timestamp).getTime() <
                            3600000 && (
                            <div className="absolute top-2 right-2">
                              <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                                New
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </Marquee>
                </AnimatePresence>
              </>
            )}
          </div>
          {showConfetti && <Confetti recycle={false} numberOfPieces={350} />}
          {/* Wishes Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <form onSubmit={handleSubmitWish} className="relative">
              <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                <div className="space-y-5">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <User className="w-4 h-4" />
                      <span>{t('wishes.yourName')}</span>
                    </div>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={t('wishes.namePlaceholder')}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                      required
                      maxLength={75}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2 relative"
                  >
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{t('wishes.attendance')}</span>
                    </div>

                    {/* Custom Select Button */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                    >
                      <span
                        className={
                          attendance ? 'text-gray-700' : 'text-gray-400'
                        }
                      >
                        {attendance
                          ? options.find((opt) => opt.value === attendance)
                              ?.label
                          : t('wishes.selectAttendance')}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Options */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                        >
                          {options.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setAttendance(option.value);
                                setIsOpen(false);
                              }}
                              whileHover={{
                                backgroundColor: 'rgb(255, 241, 242)',
                              }}
                              className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${
                                          attendance === option.value
                                            ? 'bg-rose-50 text-rose-600'
                                            : 'text-gray-700 hover:bg-rose-50'
                                        }`}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {/* Wish Textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('wishes.yourWish')}</span>
                    </div>
                    <textarea
                      value={newWish}
                      onChange={(e) => setNewWish(e.target.value)}
                      placeholder={t('wishes.placeholder')}
                      className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                      required
                      maxLength={300}
                    />
                  </div>
                </div>
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t('wishes.successMessage')}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    {t('wishes.errorMessage')}
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Smile className="w-5 h-5" />
                    <span className="text-xs">{t('wishes.giveYourWish')}</span>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`flex items-center text-sm space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${
                      isSubmitting
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-rose-500 hover:bg-rose-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>{t('wishes.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('wishes.send')}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Scrollable Wishes Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-rose-500" />
                {t('wishes.recentWishes')}
              </h3>
            </div>

            <div
              ref={wishesContainerRef}
              className="max-h-[300px] overflow-y-auto pr-2 space-y-4 custom-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#f43f5e #fee2e2',
              }}
            >
              {wishes.slice(0, 8).map((wish, index) => (
                <motion.div
                  key={`scroll-${wish.id || index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 rounded-lg border border-rose-100 shadow-sm p-2"
                >
                  <div className="flex items-center justify-start gap-x-2">
                    <figure className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                      {wish.name && wish.name[0]
                        ? wish.name[0].toUpperCase()
                        : '?'}
                    </figure>

                    <figcaption className="text-gray-600 text-sm leading-relaxed line-clamp-5">
                      {wish.message}
                    </figcaption>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
