export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="w-full bg-[#0a0a0a] text-[#7a7a7a] py-12 px-6 md:px-12 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center">
      
      {/* Copyright */}
      <div className="font-sans text-xs uppercase tracking-widest mb-6 md:mb-0">
        <p>&copy; {currentYear} Natalia Lara. Todos los derechos reservados.</p>
      </div>

      {/* Enlaces Sociales / Contacto */}
      <div className="flex gap-8 font-sans text-xs uppercase tracking-widest">
        <a 
          href="https://www.instagram.com/mejokojisoldelpecho" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-[#f4f4f0] transition-colors duration-300"
        >
          Instagram
        </a>
        <a 
          href="mailto:ailatanpoe@gmail.com" 
          className="hover:text-[#f4f4f0] transition-colors duration-300"
        >
          Contacto
        </a>
      </div>
      
    </footer>
  );
}