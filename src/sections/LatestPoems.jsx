import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

// ==========================================
// REPRODUCTOR DE VIDEO CUSTOM
// ==========================================
const CustomVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-pointer group" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        className="relative z-10 w-full h-full object-contain p-4 md:p-12 drop-shadow-2xl"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        playsInline
      />
      
      <div className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isPlaying ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        <div className="w-20 h-20 bg-[#000000]/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[#f2f2f2] border-b-[10px] border-b-transparent ml-1 transition-transform group-hover:scale-110"></div>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-12 right-12 h-[2px] bg-white/10 rounded-full z-20 pointer-events-none overflow-hidden">
        <div 
          className="h-full bg-[#f2f2f2] transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function LatestPoems({ poemsData }) {
  const [selectedPoem, setSelectedPoem] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  // EFECTO LIMPIO: Ya no da el error rojo de setState
  useEffect(() => {
    if (selectedPoem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPoem]);

  const mediaList = [];
  if (selectedPoem) {
    if (selectedPoem.videoUrl) {
      mediaList.push({ type: 'video', url: selectedPoem.videoUrl });
    }
    if (selectedPoem.gallery && selectedPoem.gallery.length > 0) {
      selectedPoem.gallery.forEach(img => {
        mediaList.push({ type: 'image', url: urlFor(img).width(2400).quality(100).auto('format').url() });
      });
    } else if (selectedPoem.poemImage) {
      mediaList.push({ type: 'image', url: urlFor(selectedPoem.poemImage).width(2400).quality(100).auto('format').url() });
    }
  }

  const handleNextMedia = () => setMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  const handlePrevMedia = () => setMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));

  if (!poemsData || poemsData.length === 0) return null;

  const hasVisualMedia = mediaList.length > 0;
  const hasText = selectedPoem?.content && selectedPoem.content.length > 0;
  const hasAudio = !!selectedPoem?.audioUrl;

  return (
    <>
      <style>{`
        /* IMPORTAMOS SATOSHI (Moderna y Limpia) + PLAYFAIR (Editorial) */
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');
        
        .font-modern { font-family: 'Satoshi', sans-serif; text-transform: uppercase; }
        .font-readable { font-family: 'Satoshi', sans-serif; font-weight: 400; }
        .font-editorial { font-family: 'Playfair Display', serif; }
        
        .text-balance { text-wrap: balance; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03; pointer-events: none;
        }
      `}</style>

      {/* 1. SECCIÓN DE ARCHIVO (CON ID PARA EL NAVBAR) */}
      <section id="latest-poems" className="w-full bg-[#050505] text-[#f2f2f2] py-32 px-6 md:px-12 border-t border-[#1a1a1a]">
        <div className="w-full max-w-[80rem] mx-auto">
          
          <div className="flex justify-start items-end border-b border-[#333] pb-8 mb-16">
            <h2 className="font-editorial italic text-5xl md:text-7xl font-light tracking-wide text-[#e5e5e0]">
              Poemas.
            </h2>
          </div>

          <div className="flex flex-col w-full">
            {poemsData.map((poem, index) => (
              <div 
                key={poem._id}
                onClick={() => {
                  setSelectedPoem(poem);
                  setMediaIndex(0); // Reinicia el carrusel de forma segura aquí
                }}
                className="group py-8 md:py-12 border-b border-[#1a1a1a] cursor-pointer flex flex-col md:flex-row md:items-center relative transition-colors duration-500 hover:bg-[#0a0a0a]"
              >
                <div className="flex items-center w-24 md:w-32 opacity-30 group-hover:opacity-100 transition-opacity">
                  <span className="font-modern font-bold text-xs md:text-sm tracking-[0.3em] text-[#e5e5e0]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* TÍTULO UNIFICADO */}
                <h3 className="flex-1 font-modern font-bold text-2xl md:text-4xl lg:text-5xl text-[#444] group-hover:text-[#f2f2f2] transition-colors duration-500 tracking-[0.15em]">
                  {poem.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. LIENZO DE LECTURA */}
      <AnimatePresence>
        {selectedPoem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0d0d0d] text-[#f2f2f2] flex flex-col md:flex-row overflow-hidden"
          >
            <button 
              onClick={() => setSelectedPoem(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] cursor-pointer mix-blend-difference"
            >
              <div className="w-12 h-12 rounded-full border border-[#555] flex items-center justify-center hover:bg-[#f2f2f2] hover:text-[#030303] transition-all duration-300 backdrop-blur-sm">
                <span className="text-sm font-bold">✕</span>
              </div>
            </button>

            {/* ZONA MULTIMEDIA */}
            {hasVisualMedia && (
              <div className={`relative bg-[#030303] group select-none transition-all duration-700 ${hasText ? 'w-full md:w-[60%] h-[45vh] md:h-full' : 'w-full h-full'}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mediaIndex}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
                    className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden"
                  >
                    {mediaList[mediaIndex].type === 'image' ? (
                      <>
                        <img src={mediaList[mediaIndex].url} alt="Blur" className="absolute inset-0 w-full h-full object-cover blur-[80px] opacity-40 scale-110" />
                        <img src={mediaList[mediaIndex].url} alt={selectedPoem.title} className="relative z-10 w-full h-full object-contain p-4 md:p-12 drop-shadow-2xl" />
                      </>
                    ) : (
                      <CustomVideoPlayer src={mediaList[mediaIndex].url} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* TÍTULO FLOTANTE (Si no hay texto) */}
                {!hasText && (
                  <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50 mix-blend-difference pointer-events-none pr-24">
                    <h1 className="font-modern font-black text-4xl md:text-6xl lg:text-7xl text-[#f2f2f2] text-balance break-normal hyphens-none tracking-[0.02em]" style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}>
                      {selectedPoem.title}
                    </h1>
                  </div>
                )}

                {mediaList.length > 1 && (
                  <>
                    <div onClick={handlePrevMedia} className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize z-20" />
                    <div onClick={handleNextMedia} className="absolute inset-y-0 right-0 w-1/4 cursor-e-resize z-20" />
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-30 pointer-events-none">
                      {mediaList.map((_, idx) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === mediaIndex ? 'w-8 bg-[#f2f2f2]' : 'w-1.5 bg-[#888]/50'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ZONA DE TEXTO */}
            {(hasText || hasAudio || !hasVisualMedia) && (
              <div 
                className={`overflow-y-auto bg-[#0d0d0d] px-8 py-12 md:px-16 md:py-24 overscroll-contain transition-all duration-700
                  ${hasVisualMedia ? 'w-full md:w-[40%] h-[55vh] md:h-full' : 'w-full h-full flex flex-col items-center'}`}
                onWheel={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
              >
                <div className={`flex flex-col h-full ${hasVisualMedia ? 'max-w-[40rem]' : 'max-w-[50rem] text-center mt-20'}`}>
                  
                  <div className="mb-16">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="font-modern font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#f2f2f2] mb-8 text-balance break-normal hyphens-none tracking-[0.02em]"
                      style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
                    >
                      {selectedPoem.title}
                    </motion.h1>

                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                      className={`flex opacity-50 ${!hasVisualMedia ? 'justify-center' : ''}`}
                    >
                      <span className="font-modern font-bold text-[10px] uppercase tracking-[0.2em]">
                        {selectedPoem.author || 'Natalia Lara'}
                      </span>
                    </motion.div>
                  </div>

                  {hasAudio && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                      className={`mb-12 w-full flex items-center ${!hasVisualMedia ? 'justify-center' : ''}`}
                    >
                      <audio controls className="h-8 w-[80%] md:w-[60%] grayscale invert opacity-70"><source src={selectedPoem.audioUrl} type="audio/mpeg" /></audio>
                    </motion.div>
                  )}

                  <style>{`
                    .prose-poem p { margin-bottom: 2.5rem; color: #a3a3a3; font-weight: 400; font-size: 1.15rem; line-height: 1.8; }
                    @media (min-width: 768px) { .prose-poem p { font-size: 1.25rem; line-height: 1.9; } }
                    .prose-poem p:hover { color: #ffffff; transition: color 0.4s ease; }
                    .prose-poem strong { color: #ffffff; font-weight: 700; background-color: transparent !important; }
                    .prose-poem em { color: #e5e5e0; font-style: italic; font-family: 'Playfair Display', serif; }
                  `}</style>

                  {hasText && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full flex-1">
                      <div className="prose-poem font-readable">
                        <PortableText value={selectedPoem.content} />
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}