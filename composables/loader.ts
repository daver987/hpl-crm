import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: import.meta.env.VITE_MAPS_KEY as string,
  libraries: ['places'],
  version: 'weekly',
  region: 'ca',
})
export { loader }
