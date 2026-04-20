import { motion } from 'framer-motion';

export default function Hero() {
  return (
    // Fondo negro profundo, sin líneas, sin distracciones
    <section className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-center overflow-hidden pt-20">
      <div className="w-full max-w-[100rem] mx-auto px-4 md:px-12 flex flex-col justify-center">

        {/* Contenedor Tipográfico: tracking ajustado y line-height aplastado para el efecto editorial */}
        <div className="flex flex-col w-full font-display uppercase tracking-tighter leading-[0.8] select-none">
          
          {/* LÍNEA 1: NATALIA (Alineado a la izquierda) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="self-start"
          >
            <h1 className="text-[18vw] md:text-[14vw] text-[#e5e5e0]">
              NATALIA
            </h1>
          </motion.div>

          {/* LÍNEA 2: LARA. poesía (Desplazado hacia el centro) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="self-start md:self-center flex items-end ml-4 md:ml-20"
          >
            {/* LARA en gris oscuro para darle profundidad */}
            <span className="text-[18vw] md:text-[14vw] text-[#333333]">
              LARA.
            </span>
            {/* poesía en Serif itálica, contrastando con el bloque grotesco */}
            <span className="text-[16vw] md:text-[11vw] font-serif italic lowercase tracking-normal text-[#e5e5e0] ml-4 md:ml-8 mb-1 md:mb-5">
              poesía
            </span>
          </motion.div>

          {/* LÍNEA 3: & NARRATIVA (Alineado a la derecha) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="self-end mt-2 md:mt-0"
          >
            <span className="text-[18vw] md:text-[14vw] text-[#e5e5e0]">
              & NARRATIVA
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}