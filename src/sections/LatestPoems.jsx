import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

export default function LatestPoems({ poemsData }) {
  const [selectedPoem, setSelectedPoem] = useState(null);

  // Bloquea el scroll de la página cuando el poema está abierto
  useEffect(() => {
    if (selectedPoem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPoem]);

  if (!poemsData || poemsData.length === 0) return null;

  return (
    <>
      {/* ----------------------------------------------------- */}
      {/* 1. LA LISTA PRINCIPAL (Minimalismo Tipográfico Puro)  */}
      {/* ----------------------------------------------------- */}
      <section className="w-full bg-[#050505] text-[#e5e5e0] py-32 px-6 md:px-12 border-t border-[#1a1a1a]">
        <div className="w-full max-w-[80rem] mx-auto flex flex-col items-center">
          
          <div className="flex flex-col items-center mb-24">
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#555] mb-6">
              Archivo
            </span>
            <h2 className="font-serif text-4xl md:text-6xl italic text-[#e5e5e0] font-light tracking-wide text-center">
              Últimos escritos.
            </h2>
          </div>

          <div className="flex flex-col w-full">
            {poemsData.map((poem, index) => (
              <div 
                key={poem._id}
                onClick={() => setSelectedPoem(poem)}
                className="group py-12 md:py-16 border-b border-[#1a1a1a] cursor-pointer flex flex-col md:flex-row md:items-center justify-between relative transition-all duration-700 hover:border-[#444]"
              >
                {/* Número y metadatos */}
                <div className="flex items-center gap-6 mb-6 md:mb-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500 w-32">
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#e5e5e0]">
                    Nº {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Título en la lista */}
                <h3 className="flex-1 font-sans font-medium text-4xl md:text-5xl lg:text-7xl text-[#666] group-hover:text-[#e5e5e0] transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:translate-x-4 uppercase tracking-tighter">
                  {poem.title}
                </h3>
                
                {/* Indicador de acción sutil */}
                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-700 items-center gap-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#e5e5e0]">
                    Leer Obra
                  </span>
                  <span className="text-xl font-light">↗</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------- */}
      {/* 2. EL LIENZO DE LECTURA (Experiencia Cinemática)      */}
      {/* ----------------------------------------------------- */}
      <AnimatePresence>
        {selectedPoem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] text-[#e5e5e0] overflow-y-auto overflow-x-hidden"
          >
            
            {/* FONDO CINEMÁTICO: La imagen como textura con degradado */}
            <div className="fixed inset-0 w-full h-[100vh] z-0 pointer-events-none">
              {selectedPoem.poemImage ? (
                <>
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={urlFor(selectedPoem.poemImage).url()} 
                    alt={selectedPoem.title}
                    className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
                  />
                  {/* El Degradado: Transparente arriba, Negro absoluto donde va el texto */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/10 via-[#050505]/80 to-[#050505]"></div>
                </>
              ) : (
                <div className="w-full h-full bg-[#050505]"></div>
              )}
            </div>

            {/* NAVEGACIÓN SUPERIOR */}
            <div className="w-full flex justify-between items-center p-6 md:p-12 fixed top-0 left-0 z-50">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#888] mix-blend-difference">
                Lectura en curso
              </span>
              <button 
                onClick={() => setSelectedPoem(null)}
                className="group flex items-center gap-4 cursor-pointer mix-blend-difference"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-80 group-hover:opacity-100 transition-opacity">
                  Cerrar
                </span>
                <div className="w-10 h-10 rounded-full border border-[#555] flex items-center justify-center group-hover:border-[#e5e5e0] transition-colors">
                  <span className="text-xs font-light">✕</span>
                </div>
              </button>
            </div>

            {/* CONTENIDO DEL POEMA */}
            <div className="relative z-10 w-full max-w-[50rem] mx-auto min-h-screen flex flex-col items-center pt-[30vh] pb-32 px-6">
              
              {/* FUSIÓN TIPOGRÁFICA DINÁMICA DEL TÍTULO */}
              <div className="mb-20 text-center w-full">
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter flex flex-col md:flex-row flex-wrap justify-center items-center md:items-baseline gap-x-6 gap-y-2">
                  <span className="font-sans font-black uppercase text-[#e5e5e0]">
                    {selectedPoem.title.split(' ')[0]}
                  </span>
                  {selectedPoem.title.split(' ').length > 1 && (
                    <span className="font-serif italic lowercase text-[#a3a3a3] font-light">
                      {selectedPoem.title.split(' ').slice(1).join(' ')}
                    </span>
                  )}
                </h1>
              </div>
              
              <div className="w-[1px] h-24 bg-gradient-to-b from-[#555] to-transparent mb-16"></div>

              {/* TEXTO DEL POEMA */}
              <div className="font-serif text-lg md:text-2xl text-[#c4c4c4] leading-[2.2] tracking-wide w-full text-center">
                <style>{`
                  .prose-poem p { margin-bottom: 2.5rem; }
                  .prose-poem em { color: #e5e5e0; font-style: italic; }
                  .prose-poem strong { color: #e5e5e0; font-weight: normal; }
                `}</style>

                <div className="prose-poem">
                  {selectedPoem.content ? (
                    <PortableText value={selectedPoem.content} />
                  ) : (
                    <p className="italic text-[#555]">Obra sin transcripción.</p>
                  )}
                </div>
              </div>

              <div className="mt-40 w-full flex justify-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#333]">
                  FIN
                </span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}