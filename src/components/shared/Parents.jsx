import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import config from '@/config/config';
import PropTypes from 'prop-types';

const images = {
  dad: '/images/dad.jpg',
  mom: '/images/mom.jpg',
  dadInLaw: '/images/dad-in-law.jpg',
  momInLaw: '/images/mom-in-law.jpg',
};

const Card = ({
  title,
  father,
  mother,
  fatherImage,
  motherImage,
  itemVariants,
  t,
}) => (
  <motion.div
    variants={itemVariants}
    className="relative group bg-white rounded-3xl p-10 shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-500"
  >
    <div className="absolute -top-5 -left-5 w-16 h-16 bg-rose-100 rounded-full blur-2xl z-0" />
    <div className="relative z-10 text-center space-y-8">
      <div>
        <h3 className="text-3xl font-serif text-gray-800 mb-2">{title}</h3>
        <div className="h-px w-20 bg-rose-300 mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-2 border-rose-50 opacity-85 flex items-center justify-center shadow-md relative overflow-hidden">
            <img
              src={fatherImage}
              alt="Father"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <h4 className="text-sm uppercase tracking-widest text-rose-400 mt-3">
            {t('parents.father')}
          </h4>
          <p className="text-xl font-serif text-gray-700 mt-1">{father}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-2 border-rose-50 opacity-85 flex items-center justify-center shadow-md relative overflow-hidden">
            <img
              src={motherImage}
              alt="Mother"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <h4 className="text-sm uppercase tracking-widest text-rose-400 mt-3">
            {t('parents.mother')}
          </h4>
          <p className="text-xl font-serif text-gray-700 mt-1">{mother}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  father: PropTypes.string.isRequired,
  mother: PropTypes.string.isRequired,
  fatherImage: PropTypes.string.isRequired,
  motherImage: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  itemVariants: PropTypes.object.isRequired,
};

const Parents = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="pt-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-rose-500 font-medium mb-2 inline-block">
            {t('parents.subtitle')}
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            {t('parents.title')}
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-rose-200" />
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <div className="h-px w-12 bg-rose-200" />
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('parents.description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10"
        >
          <Card
            title={t('parents.groom')}
            father={config.data.parentGroom.father}
            mother={config.data.parentGroom.mother}
            fatherImage={images.dad}
            motherImage={images.mom}
            t={t}
            itemVariants={itemVariants}
          />
          <Card
            title={t('parents.bride')}
            father={config.data.parentBride.father}
            mother={config.data.parentBride.mother}
            fatherImage={images.dadInLaw}
            motherImage={images.momInLaw}
            t={t}
            itemVariants={itemVariants}
          />
        </motion.div>
        <p className="italic text-rose-500 mt-6 text-md text-center">
          {t('parents.thankYou')} ❤️
        </p>
      </div>
    </section>
  );
};

export default Parents;
