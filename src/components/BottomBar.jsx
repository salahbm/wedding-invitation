// src/components/bottom-bar/BottomBar.jsx
import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import config from '@/config/config';
import {
  Home,
  CalendarHeart,
  MapPin,
  MessageCircleHeart,
  Image,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const getMenuItems = (t) => [
  { icon: Home, label: t('bottomBar.home'), href: '#home', id: 'home' },
  {
    icon: CalendarHeart,
    label: t('bottomBar.events'),
    href: '#event',
    id: 'events',
  },
  {
    icon: MapPin,
    label: t('bottomBar.location'),
    href: '#location',
    id: 'location',
  },
];

const getOptionalMenuItems = (t) => {
  const items = [];

  if (config.data.showPhotos) {
    items.push({
      icon: Image,
      label: t('bottomBar.photos'),
      href: '#photos',
      id: 'photos',
    });
  }

  if (config.data.showWishes) {
    items.push({
      icon: MessageCircleHeart,
      label: t('bottomBar.wishes'),
      href: '#wishes',
      id: 'wishes',
    });
  }

  return items;
};

const BottomBar = () => {
  const { t } = useTranslation();
  const [active, setActive] = React.useState('home');
  const menuItems = useMemo(
    () => [...getMenuItems(t), ...getOptionalMenuItems(t)],
    [t],
  );

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = menuItems
        .map((item) => ({
          id: item.id,
          element: document.querySelector(item.href),
        }))
        .filter((item) => item.element);
      const current = sections
        .filter(
          ({ element }) =>
            element.getBoundingClientRect().top <= window.innerHeight * 0.4,
        )
        .at(-1);
      setActive(current?.id || 'home');
    };
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [menuItems]);

  return (
    <motion.div
      className="bottom-navigation fixed inset-x-0 mx-auto z-50 w-full px-4 max-w-screen-md"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className="backdrop-blur-md bg-card/95 border border-border rounded-3xl shadow-[0_8px_32px_hsl(var(--primary)_/_0.1)] p-2">
        <nav
          aria-label={t('controls.navigation')}
          className="flex justify-between items-center gap-1"
        >
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              aria-current={active === item.id ? 'location' : undefined}
              className={cn(
                'min-h-14 min-w-0 flex-1 flex flex-col items-center justify-center py-2 px-1 md:px-6 rounded-2xl transition-all duration-200',
                'hover:bg-gray-50/80',
                active === item.id
                  ? 'text-primary bg-primary-50'
                  : 'text-gray-600',
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(item.id)}
            >
              <item.icon
                className={cn(
                  'size-6 transition-colors duration-200',
                  active === item.id ? 'stroke-primary-500' : 'stroke-gray-600',
                )}
              />
              {/* <span
                className={cn(
                  'text-xs font-medium transition-all duration-200 line-clamp-1',
                  active === item.id ? 'scale-105 text-primary-500' : 'scale-100'
                )}
              >
                {item.label}
              </span> */}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default BottomBar;
