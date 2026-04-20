import { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, PresentationControls, ContactShadows, Environment } from '@react-three/drei';
import { urlFor } from '../lib/sanity';

// --------------------------------------------------------
// SUB-COMPONENTE 3D: El Libro Sólido
// --------------------------------------------------------
function Book3D({ coverUrl, backCoverUrl, spineColor }) {
  const animationRef = useRef();

  const [frontTexture, backTexture] = useTexture([
    coverUrl,
    backCoverUrl || coverUrl
  ], (textures) => {
    textures.forEach(t => t.anisotropy = 16);
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (animationRef.current) {
      animationRef.current.position.y = Math.sin(t / 1.5) * 0.1;
      animationRef.current.rotation.y = Math.sin(t / 2) * 0.05;
      animationRef.current.rotation.z = Math.sin(t / 4) * 0.01;
    }
  });

  return (
    <group ref={animationRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 4.5, 0.4]} />
        
        <meshStandardMaterial attach="material-0" color="#e5e5e0" /> 
        <meshStandardMaterial attach="material-1" color={spineColor || "#1a1a1a"} roughness={0.8} /> 
        <meshStandardMaterial attach="material-2" color="#e5e5e0" /> 
        <meshStandardMaterial attach="material-3" color="#e5e5e0" /> 
        {/* LA SOLUCIÓN DEL BRILLO: Acabado Mate Premium (roughness 0.85, metalness 0) */}
        <meshStandardMaterial attach="material-4" map={frontTexture} roughness={0.85} metalness={0} /> 
        <meshStandardMaterial attach="material-5" map={backTexture} roughness={0.85} metalness={0} /> 
      </mesh>
    </group>
  );
}

// --------------------------------------------------------
// COMPONENTE PRINCIPAL
// --------------------------------------------------------
export default function FeaturedBook({ bookData }) {
  if (!bookData) return null;

  const coverUrl = bookData.cover ? urlFor(bookData.cover).url() : null;
  const backCoverUrl = bookData.backCover ? urlFor(bookData.backCover).url() : null;

  return (
    <section className="relative w-full bg-[#f4f4f0] text-[#0a0a0a] py-32 px-4 md:px-8 border-t-2 border-[#0a0a0a] overflow-hidden">
      <div className="w-full max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* COLUMNA IZQUIERDA: Escenario 3D Interactivo */}
        <div className="lg:col-span-6 w-full h-[60vh] md:h-[80vh] relative cursor-grab active:cursor-grabbing">
          
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <Suspense fallback={null}>
              <Environment preset="studio" />
              
              <PresentationControls 
                global={false} 
                cursor={true}
                snap={true} 
                speed={2} 
                // EL ÁNGULO PERFECTO QUE PEDISTE
                rotation={[0.05, 0.4, 0]} 
                polar={[-0.2, 0.2]} 
              >
                <group position={[0, 0, 0]}>
                  {coverUrl && (
                    <Book3D 
                      coverUrl={coverUrl} 
                      backCoverUrl={backCoverUrl} 
                      spineColor={bookData.spineColor} 
                    />
                  )}
                </group>
              </PresentationControls>

              <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4.5} />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 flex items-center gap-3 pointer-events-none">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#5a5a5a]">
              Interactúa con el libro
            </span>
          </div>
        </div>

        {/* COLUMNA DERECHA: Información Editorial */}
        <motion.div 
          className="lg:col-span-6 flex flex-col items-start lg:pl-16"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[2px] bg-[#0a0a0a]"></span>
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-[#ff3300]">
              LIBRO Y ANTOLOGÍAS
            </p>
          </div>
          
          <h2 className="text-[12vw] lg:text-[7vw] font-display uppercase leading-[0.8] tracking-tighter mb-10 text-[#0a0a0a]">
            {bookData.title}
          </h2>
          
          <p className="font-sans text-sm md:text-base text-[#333] font-medium leading-relaxed max-w-md mb-12 border-l-2 border-[#d1d1d1] pl-6">
            {bookData.description}
          </p>
          
          {bookData.purchaseLink && (
            <a 
              href={bookData.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-12 py-5 font-sans text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase bg-[#0a0a0a] text-[#f4f4f0] overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#ff3300] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></span>
              <span className="relative z-10">Adquirir Ejemplar ↗</span>
            </a>
          )}
        </motion.div>

      </div>
    </section>
  );
}