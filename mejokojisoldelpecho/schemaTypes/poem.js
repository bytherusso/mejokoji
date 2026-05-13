export default {
  name: 'poem',
  title: 'Poemas',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Poema',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Nombre de la Poeta',
      type: 'string',
      initialValue: 'Natalia Lara', // Valor predeterminado para agilizar la carga
    },
    {
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      title: 'Contenido del Poema',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'poemImage',
      title: 'Imagen de Acompañamiento (Opcional)',
      type: 'image',
      description: 'Sube una imagen principal que capture la esencia del poema.',
      options: {
        hotspot: true, // Permite elegir el foco visual de la imagen
      },
    },
    {
      name: 'imageCredits',
      title: 'Créditos de la Fotografía Principal',
      type: 'string',
      placeholder: 'Ej: Fotografía por Juan Pérez',
    },
    
    // ==========================================
    // NUEVOS CAMPOS MULTIMEDIA (High-End)
    // ==========================================
    
    {
      name: 'gallery',
      title: 'Galería (Múltiples Imágenes / Carrusel)',
      type: 'array',
      description: 'Agrega múltiples imágenes aquí. Se mostrarán en un carrusel deslizable.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Le permite a Natalia elegir el encuadre de cada foto
          },
        },
      ],
    },
    {
      name: 'videoUrl',
      title: 'Archivo de Video (Cinemático)',
      type: 'file',
      description: 'Sube un archivo de video (preferiblemente en formato MP4 y que no sea muy pesado).',
      options: {
        accept: 'video/*', // Solo permite subir archivos de video
      },
    },
    {
      name: 'audioUrl',
      title: 'Registro de Voz / Audio',
      type: 'file',
      description: 'Sube una pista de audio (MP3, WAV) con la recitación del poema.',
      options: {
        accept: 'audio/*', // Solo permite subir archivos de audio
      },
    }
  ],
}