import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      {/* El punto principal exacto en el cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#f4f4f0] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* El anillo que lo sigue con físicas de resorte (retraso elegante) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#f4f4f0] opacity-50 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: 'spring', mass: 0.2, stiffness: 100, damping: 15 }}
      />
    </>
  );
}