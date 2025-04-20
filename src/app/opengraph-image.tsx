import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'home Page'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden"><div className="absolute inset-0 bg-[url('/placeholder.jpg')] bg-cover bg-center brightness-75"></div><div className="container mx-auto px-4 relative z-10 text-white text-center my-12"><div className="max-w-3xl mx-auto"><div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-globe w-5 h-5 text-accent"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg><span className="text-sm font-medium">Consultoria de Vistos Internacionais</span></div><h1 className="text-4xl md:text-6xl font-bold mb-6">Realize seu sonho de morar no exterior</h1><p className="text-lg md:text-xl mb-8 opacity-90">A Gota D' Sol oferece consultoria especializada para obtenção de vistos em diversos países, com atendimento personalizado e alta taxa de aprovação.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><a className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors" href="/service">Conheça nossos serviços<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a><a className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-colors border border-white/20" href="/contato">Fale conosco</a></div></div><div className="mt-16 flex flex-wrap justify-center gap-6"><div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check w-5 h-5 text-accent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg><span>Alta taxa de aprovação</span></div><div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check w-5 h-5 text-accent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg><span>Atendimento personalizado</span></div><div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-check w-5 h-5 text-accent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg><span>Consultores especializados</span></div></div></div></section>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}