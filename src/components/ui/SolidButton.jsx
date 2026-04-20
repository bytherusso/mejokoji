export default function SolidButton({ href, children, target = "_self" }) {
  return (
    <a 
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : ""}
      className="group relative inline-flex items-center justify-center px-10 py-5 font-sans text-xs font-medium tracking-widest uppercase border border-current overflow-hidden cursor-pointer"
    >
      {/* El fondo que sube al hacer hover */}
      <span className="absolute inset-0 bg-current translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"></span>
      
      {/* El texto que cambia de color al contrastar con el nuevo fondo */}
      <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors duration-500 delay-100">
        {children}
      </span>
    </a>
  );
}