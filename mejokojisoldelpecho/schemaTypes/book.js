export default {
  name: 'book',
  title: 'Libros y Participaciones',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Obra',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cover',
      title: 'Portada (Frontal)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'backCover',
      title: 'Contraportada (Trasera)',
      type: 'image',
      options: { hotspot: true },
      description: 'Sube la imagen de la parte de atrás para que el libro no desaparezca al girar.'
    },
    {
      name: 'spineColor',
      title: 'Color del Lomo',
      type: 'string',
      description: 'Código HEX (ej: #1a1a1a) para el lateral del libro.',
      initialValue: '#1a1a1a'
    },
    {
      name: 'description',
      title: 'Descripción / Reseña',
      type: 'text',
      rows: 4,
    },
    {
      name: 'purchaseLink',
      title: 'Link de Compra',
      type: 'url',
    },
    {
      name: 'isFeatured',
      title: '¿Es Obra Principal?',
      type: 'boolean',
      initialValue: false,
    }
  ],
}