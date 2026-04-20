import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lista de enlaces de navegación (Ajusta los IDs según los que uses en tus secciones)
const navLinks = [
  { title: 'Inicio', id: 'hero' },
  { title: 'El Libro', id: 'featured-book' },
  { title: 'Archivo Poético', id: 'latest-poems' },
  { title: 'Contacto', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquea el scroll de la página cuando el menú a pantalla completa está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Función para manejar el Smooth Scroll
  const handleScroll = (id) => {
    setIsOpen(false); // Cierra el menú
    
    // Le damos un pequeño retraso para que la animación de cierre termine antes de hacer scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600); 
  };

  return (
    <>
      {/* ----------------------------------------------------- */}
      {/* 1. BARRA DE NAVEGACIÓN FIJA (Siempre visible)         */}
      {/* ----------------------------------------------------- */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 z-40 flex justify-between items-center pointer-events-none mix-blend-difference text-[#e5e5e0]">
        
        {/* Logo / Marca */}
        <div className="pointer-events-auto cursor-pointer flex items-center gap-4" onClick={() => handleScroll('hero')}>
          <span className="font-sans font-black text-xl tracking-tighter">N.L.</span>
          <span className="hidden md:inline-block font-sans text-[9px] uppercase tracking-[0.4em] opacity-80">
            
          </span>
        </div>

        {/* Botón de Menú */}
        <button 
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group flex items-center gap-4 cursor-pointer"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold group-hover:opacity-70 transition-opacity">
            Menú
          </span>
          <div className="w-8 h-[2px] bg-[#e5e5e0] group-hover:w-12 transition-all duration-300"></div>
        </button>
      </header>

      {/* ----------------------------------------------------- */}
      {/* 2. OVERLAY DEL MENÚ (A Pantalla Completa)             */}
      {/* ----------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] text-[#e5e5e0] flex flex-col"
          >
            
            {/* Cabecera interna del Menú */}
            <div className="w-full p-6 md:p-12 flex justify-between items-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-50">
                Navegación
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
                  Cerrar
                </span>
                <div className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#e5e5e0] transition-colors">
                  <span className="text-xs font-light">✕</span>
                </div>
              </button>
            </div>

            {/* Lista de Enlaces Central */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-24">
              <nav className="flex flex-col gap-6 md:gap-10">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <button 
                      onClick={() => handleScroll(link.id)}
                      className="group flex items-center gap-8 text-left"
                    >
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-5xl md:text-7xl lg:text-[7rem] italic text-[#555] group-hover:text-[#e5e5e0] transition-colors duration-500 tracking-tight leading-none">
                        {link.title}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer del Menú */}
            <div className="w-full p-6 md:p-12 flex justify-between items-end border-t border-[#1a1a1a]">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] opacity-50">Redes</span>
                <a href="#" className="font-sans text-xs uppercase tracking-widest hover:text-[#cbfb45] transition-colors">Instagram ↗</a>
              </div>
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] opacity-30 text-right">
                Natalia Lara <br/> © {new Date().getFullYear()}
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}