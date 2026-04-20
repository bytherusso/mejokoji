import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { client } from './lib/sanity';

// Layout & UI
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';

// Sections
import Hero from './sections/Hero';
import LatestPoems from './sections/LatestPoems';
import FeaturedBook from './sections/FeaturedBook';
import Collaborations from './sections/Collaborations';

export default function App() {
  const [poems, setPoems] = useState([]);
  const [featuredBook, setFeaturedBook] = useState(null);
  const [collaborations, setCollaborations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Inicialización de Lenis (Smooth Scroll de alta gama)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de aceleración suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Extracción de datos desde Sanity
    const fetchData = async () => {
      try {
        // Traemos todo en paralelo para optimizar la carga
        const [poemsData, featuredData, collabsData] = await Promise.all([
          client.fetch(`*[_type == "poem"] | order(_createdAt desc)`),
          client.fetch(`*[_type == "book" && isFeatured == true][0]`),
          client.fetch(`*[_type == "book" && isFeatured != true] | order(_createdAt desc)`)
        ]);

        setPoems(poemsData);
        setFeaturedBook(featuredData);
        setCollaborations(collabsData);
      } catch (error) {
        console.error("Fallo en la sincronización con Sanity:", error);
      } finally {
        // Mantenemos la pantalla de carga un momento para asegurar la inmersión
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    fetchData();

    return () => {
      lenis.destroy();
    };
  }, []);

  // Pantalla de Carga Brutalista / Cinematográfica
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex items-center justify-center text-[#f4f4f0]">
        <div className="flex flex-col items-center">
          <span className="font-display text-[12vw] md:text-[6vw] uppercase tracking-tighter leading-none animate-pulse">
            Cargando
          </span>
          <span className="font-serif italic text-[14vw] md:text-[7vw] text-[#ff3300] lowercase leading-none -mt-4">
            obra.
          </span>
        </div>
      </div>
    );
  }

  return (
    // 'cursor-none' oculta el ratón del sistema para el CustomCursor
    // 'selection:*' personaliza el color de subrayado (branding puro)
    <div className="bg-[#0a0a0a] min-h-screen cursor-none selection:bg-[#ff3300] selection:text-[#f4f4f0] overflow-x-hidden">
      
      {/* Elemento interactivo que sigue al ratón */}
      <CustomCursor />
      
      <Navbar />
      
      <main>
        {/* El Hero a la espera de tu boceto personalizado */}
        <Hero /> 
        
        {/* Grilla asimétrica de poemas reales */}
        <LatestPoems poemsData={poems} />
        
        {/* Sección con el monolito 3D interactivo (Three.js) */}
        <FeaturedBook bookData={featuredBook} />
        
        {/* Índice tipográfico agresivo */}
        <Collaborations collabsData={collaborations} />
      </main>

      <Footer />
    </div>
  );
}