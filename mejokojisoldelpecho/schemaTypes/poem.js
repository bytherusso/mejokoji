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

description: 'Sube una imagen que capture la esencia del poema.',

options: {

hotspot: true, // Permite elegir el foco visual de la imagen

},

},

{

name: 'imageCredits',

title: 'Créditos de la Fotografía',

type: 'string',

placeholder: 'Ej: Fotografía por Juan Pérez',

},

],

}