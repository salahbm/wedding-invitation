import { motion, AnimatePresence } from 'framer-motion';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import BottomBar from '@/components/BottomBar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import useMusic from '@/hooks/music/useMusic';

const Layout = ({ children, startInvitation }) => {
  const { isPlaying, showToast, toggleMusic, audioTitle } = useMusic();

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <motion.div
        className={cn(
          'mx-auto w-full bg-white relative overflow-hidden border border-gray-200 shadow-lg',
          startInvitation && 'max-w-screen-md'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Language Switcher - positioned relative to container instead of fixed */}
        <div className="absolute top-4 left-4 z-50">
          <div className="relative">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Music Control Button with Status Indicator - matched size with language switcher */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-rose-100/50"
        >
          {isPlaying ? (
            <div className="relative">
              <PauseCircle className="w-5 h-5 text-rose-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          ) : (
            <PlayCircle className="w-5 h-5 text-rose-500" />
          )}
        </motion.button>

        <main className="relative h-full w-full pb-[100px]">{children}</main>
        {startInvitation && <BottomBar />}
        {/* Music Info Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'fixed left-1/2 transform -translate-x-1/2 z-50',
                startInvitation ? 'bottom-24' : 'bottom-10'
              )}
            >
              <div className="bg-black/80 text-white transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2">
                <Music className="w-4 h-4 animate-pulse" />
                <span className="text-sm whitespace-nowrap">{audioTitle}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  startInvitation: PropTypes.bool,
};

export default Layout;
