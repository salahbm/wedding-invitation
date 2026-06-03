import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * LanguageSwitcher component allows users to switch between available languages.
 * It displays a dropdown menu with language options when clicked.
 */
const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Available languages
  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'uz', name: t('language.uz') },
    { code: 'ru', name: t('language.ru') },
  ];

  // Change language handler
  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-full bg-card/80 backdrop-blur-sm shadow-lg border border-border hover:bg-accent transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-primary-500" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-40 bg-card rounded-md shadow-lg py-1 border border-border focus:outline-none"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors',
                  i18n.language === language.code
                    ? 'text-primary-500 font-medium'
                    : 'text-foreground/70'
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
