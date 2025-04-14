import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  const links = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '#servicos' },
    { name: 'Diferenciais', path: '#diferenciais' },
    { name: 'Portfólio', path: '#portfolio' },
    { name: 'Depoimentos', path: '#depoimentos' },
    { name: 'Contato', path: '#contato' },
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: '#' },
    { icon: <Instagram className="w-5 h-5" />, url: '#' },
    { icon: <Linkedin className="w-5 h-5" />, url: '#' },
  ]

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Gota D' Sol</h3>
            <p className="text-muted mb-6">
              Consultoria especializada em vistos internacionais, ajudando você a realizar o sonho de morar no exterior.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  className="text-muted hover:text-background transition-colors"
                  aria-label="Social media"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {links.slice(0, 4).map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-muted hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-muted">
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                contato@gotadsol.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Av. Paulista, 1000 - SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted/20 mt-12 pt-8 text-center text-muted text-sm">
          <p>© {new Date().getFullYear()} Gota D' Sol. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}