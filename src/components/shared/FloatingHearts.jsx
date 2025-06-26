'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const COLORS = ['text-rose-400', 'text-pink-400', 'text-red-400'];
const HEART_COUNT = 25;

const getRandom = (min, max) => Math.random() * (max - min) + min;

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const generated = Array.from({ length: HEART_COUNT }, (_, i) => ({
      id: i,
      size: Math.floor(getRandom(6, 10)),
      color: COLORS[i % COLORS.length],
      startX: getRandom(0, width),
      endX: getRandom(0, width),
      delay: getRandom(0, 3), // random delay 0–3s
      duration: getRandom(4, 6),
      rotate: getRandom(-25, 25),
      startY: height + getRandom(0, 100), // spread out start Y
    }));

    setHearts(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            opacity: 0,
            scale: 0,
            x: heart.startX,
            y: heart.startY,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.1, 1, 0.5],
            x: heart.endX,
            y: -150,
            rotate: heart.rotate,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'easeInOut',
          }}
          className="absolute"
        >
          <Heart
            className={`w-${heart.size} h-${heart.size} ${heart.color}`}
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
