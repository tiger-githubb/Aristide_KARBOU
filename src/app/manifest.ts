import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aristide KARBOU Web Developer',
    short_name: 'Aristide KARBOU',
    description: 'Aristide KARBOU is a web developer and web agency manager in Togo. Specialized in front-end web development and UI/UX design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    lang: "en",
    dir: "ltr",
    orientation: "portrait-primary"


  }
}