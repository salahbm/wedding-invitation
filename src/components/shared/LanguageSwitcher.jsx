import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * LanguageSwitcher component allows users to switch between available languages.
 * It displays a dropdown menu with language options when clicked.
 */
const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const dismiss = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Available languages
  const languages = [
    { code: "en", name: t("language.en") },
    { code: "uz", name: t("language.uz") },
    { code: "ru", name: t("language.ru") },
  ];

  // Change language handler
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative z-50">
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-controls="language-options"
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-11 items-center gap-2 justify-center px-4 rounded-full border border-border bg-card/95 backdrop-blur-sm shadow-sm hover:bg-primary-50 transition-colors"
        aria-label={t("language.selectLanguage")}
      >
        <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-xs font-medium uppercase text-gray-700">
          {i18n.resolvedLanguage}
        </span>
      </button>

      {isOpen && (
        <motion.div
          id="language-options"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={cn(
                  "min-h-11 w-full text-left px-4 py-2 text-sm hover:bg-primary-50 transition-colors",
                  i18n.resolvedLanguage === language.code
                    ? "text-primary-500 font-medium"
                    : "text-gray-700",
                )}
              >
                {language.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
