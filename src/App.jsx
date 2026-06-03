import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import config from '@/config/config';
import BachelorParty from '@/pages/BachelorParty';

function App() {
  const [themeColor, setThemeColor] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  }, []);

  useEffect(() => {
    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();
    if (primary) {
      setThemeColor(`hsl(${primary})`);
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{config.data.metaTitle}</title>
        <meta name="description" content={config.data.metaDescription} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {themeColor ? <meta name="theme-color" content={themeColor} /> : null}
      </Helmet>
      <BachelorParty />
    </HelmetProvider>
  );
}

export default App;
