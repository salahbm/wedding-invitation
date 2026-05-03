import Hero from '@/pages/Hero';
import Events from '@/pages/Events';
import Location from '@/pages/Location';
import { motion } from 'framer-motion';

// Main Invitation Content
export default function MainContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 24, rotateX: -8 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <motion.section variants={sectionVariants}>
        <Hero />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <Events />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <Location />
      </motion.section>
      {/* <Photos /> */}
      {/* <Wishes /> */}
      {/* <TableNumber /> */}
    </motion.div>
  );
}
