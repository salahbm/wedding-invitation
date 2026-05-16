import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'uz', name: t('language.uz') },
    { code: 'ru', name: t('language.ru') },
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-full border border-primary-200 bg-white/90 p-2 shadow-[0_10px_30px_rgba(112,55,28,0.14)] backdrop-blur-sm transition-colors hover:bg-primary-50"
        aria-label={t('simpleTemplate.changeLanguage')}
      >
        <Globe className="h-4 w-4 text-primary-500" />
      </button>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-40 rounded-2xl border border-primary-100 bg-white py-1 shadow-xl"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => changeLanguage(language.code)}
              className={cn(
                'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary-50',
                i18n.language === language.code
                  ? 'font-medium text-primary-500'
                  : 'text-gray-700'
              )}
            >
              {language.name}
            </button>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
};

export default LanguageSwitcher;
