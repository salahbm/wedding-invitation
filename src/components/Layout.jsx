import { motion, AnimatePresence } from "framer-motion";
import { Music, PauseCircle, PlayCircle } from "lucide-react";
import BottomBar from "@/components/BottomBar";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import useMusic from "@/hooks/music/useMusic";

const Layout = ({ children, startInvitation }) => {
  const { t } = useTranslation();
  const { isPlaying, showToast, toggleMusic, audioTitle } = useMusic();

  return (
    <div
      className={cn(
        "relative min-h-svh w-full bg-background flex items-center justify-center",
      )}
    >
      <motion.div
        className={cn(
          "invitation-shell mx-auto w-full bg-background relative",
          startInvitation && "max-w-screen-md",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Language Switcher - positioned relative to container instead of fixed */}
        <div className="fixed top-4 left-4 z-50">
          <LanguageSwitcher />
        </div>

        {/* Music Control Button with Status Indicator - matched size with language switcher */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          aria-label={t(
            isPlaying ? "controls.pauseMusic" : "controls.playMusic",
          )}
          aria-pressed={isPlaying}
          className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center bg-card/95 backdrop-blur-sm rounded-full shadow-sm border border-border"
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

        <main
          className={cn(
            "relative h-full w-full ",
            startInvitation && "pb-[calc(112px+env(safe-area-inset-bottom))]",
          )}
        >
          {children}
        </main>
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
                "fixed left-1/2 transform -translate-x-1/2 z-50",
                startInvitation ? "bottom-24" : "bottom-10",
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
