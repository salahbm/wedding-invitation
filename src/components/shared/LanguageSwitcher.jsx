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
  const [isOpen, setIsOpen] = useState(true);

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
        className="flex items-center justify-center p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-rose-50 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-rose-500" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-xl"
          >
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Globe className="w-10 h-10 text-rose-500" />
              </div>
              <h2 className="text-2xl font-serif text-gray-800 mb-2">
                {t('language.selectLanguage') || 'Select Language'}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('language.selectPreferred') ||
                  'Please select your preferred language'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => changeLanguage(language.code)}
                  className={cn(
                    'py-3 px-4 rounded-xl border text-center transition-all',
                    i18n.language === language.code
                      ? 'border-rose-400 bg-rose-50 text-rose-600 font-medium'
                      : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/50'
                  )}
                >
                  {language.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;