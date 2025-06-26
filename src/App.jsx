import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import MainContent from '@/pages/MainContent';
import LandingPage from '@/pages/LandingPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import config from '@/config/config';

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          {t('meta.title', {
            groomName: config.data.groomName,
            brideName: config.data.brideName,
          })}
        </title>
        <meta
          name="title"
          content={t('meta.title', {
            groomName: config.data.groomName,
            brideName: config.data.brideName,
          })}
        />
        <meta name="description" content={t('meta.description')} />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:title"
          content={t('meta.title', {
            groomName: config.data.groomName,
            brideName: config.data.brideName,
          })}
        />
        <meta property="og:description" content={t('meta.description')} />
        <meta
          property="og:image"
          content={`${config.data.siteUrl}${config.data.ogImage}`}
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta
          property="twitter:title"
          content={t('meta.title', {
            groomName: config.data.groomName,
            brideName: config.data.brideName,
          })}
        />
        <meta property="twitter:description" content={t('meta.description')} />
        <meta
          property="twitter:image"
          content={`${config.data.siteUrl}${config.data.ogImage}`}
        />
        {/* Favicon */}
        <link
          rel="icon"
          type="image/x-icon"
          href={`${config.data.siteUrl}${config.data.favicon}`}
        />
        {/* Additional Meta Tags */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#FDA4AF" /> {/* Rose-300 color */}
      </Helmet>

      <AnimatePresence mode="wait">
        {!isInvitationOpen ? (
          <Layout startInvitation={false}>
            <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
          </Layout>
        ) : (
          <Layout startInvitation={true}>
            <MainContent />
          </Layout>
        )}
      </AnimatePresence>
    </HelmetProvider>
  );
}

export default App;
