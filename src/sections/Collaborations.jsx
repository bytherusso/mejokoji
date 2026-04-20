import { motion } from 'framer-motion';

export default function Collaborations({ collabsData }) {
  // Si no hay colaboraciones en Sanity, la sección no se renderiza
  if (!collabsData || collabsData.length === 0) return null;

  return (
    // Mantenemos el fondo oscuro para darle peso, pero usamos bordes drásticos
    <section className="w-full bg-[#0a0a0a] text-[#f4f4f0] py-32 px-4 md:px-8 border-t-2 border-[#f4f4f0] overflow-hidden">
      
      <div className="w-full flex flex-col">
        
        {/* Cabecera Brutalista */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-b-2 border-[#2a2a2a] pb-8 md:pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-[12vw] md:text-[8vw] font-display uppercase leading-[0.8] tracking-tighter m-0 p-0">
            Archivo <br/> 
            <span className="font-serif italic text-[#5a5a5a] lowercase tracking-normal">
              & Selecciones
            </span>
          </h2>
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#ff3300] md:text-right md:pb-4">
            [ Índice de Participaciones ]
          </p>
        </motion.div>

        {/* Lista de Índice Tipográfico */}
        <div className="flex flex-col">
          {collabsData.map((collab, index) => (
            <motion.a
              key={collab._id}
              href={collab.purchaseLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-b border-[#1a1a1a] hover:border-[#ff3300] transition-colors duration-500 cursor-pointer"
            >
              {/* Lado Izquierdo: Número Gigante y Título */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 relative z-10">
                {/* Número masivo estilo Ref 9 */}
                <span className="font-serif text-[20vw] md:text-[10vw] leading-[0.7] tracking-tighter text-[#1a1a1a] group-hover:text-[#ff3300] transition-colors duration-500">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                
                {/* Título de la obra */}
                <h3 className="text-4xl md:text-[4vw] font-sans font-bold tracking-tighter uppercase group-hover:italic group-hover:font-serif transition-all duration-300">
                  {collab.title}
                </h3>
              </div>

              {/* Lado Derecho: Metadatos estéticos */}
              <div className="mt-8 md:mt-0 relative z-10 flex gap-12 font-sans text-[10px] uppercase tracking-[0.2em] text-[#5a5a5a] group-hover:text-[#f4f4f0] transition-colors duration-300">
                <span className="flex flex-col gap-1">
                  <span className="text-[#333]">Formato</span>
                  <span>Antología</span>
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[#333]">Acción</span>
                  <span className="group-hover:text-[#ff3300] transition-colors">Explorar ↗</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}