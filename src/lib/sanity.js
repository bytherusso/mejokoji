import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url'; // <-- Cambio aquí (Named export)

export const client = createClient({
  projectId: 'y1b69wf0', // <-- Asegúrate de pegar tu ID (y1b69wf0)
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2024-04-18', 
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}