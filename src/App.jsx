import Layout from '@/components/Layout';
import MainContent from '@/pages/MainContent';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import config from '@/config/config';

function App() {
  const [themeColor, setThemeColor] = useState('');
  const { t } = useTranslation();

  const pageTitle = config.data.metaTitle || t('meta.title', {
    groomName: config.data.groomName,
    brideName: config.data.brideName,
  });
  const pageDescription = config.data.metaDescription || t('meta.description');

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
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`${config.data.siteUrl}${config.data.ogImage}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta
          property="twitter:image"
          content={`${config.data.siteUrl}${config.data.ogImage}`}
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={`${config.data.siteUrl}${config.data.favicon}`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        {themeColor ? <meta name="theme-color" content={themeColor} /> : null}
      </Helmet>

      <Layout>
        <MainContent />
      </Layout>
    </HelmetProvider>
  );
}

export default App;
