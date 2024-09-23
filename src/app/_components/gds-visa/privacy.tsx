'use client'

import { Button } from "@/components/ui/button"

export const GDSPrivacy: React.FC = () => {

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-4 text-justify">
        <h2 className="text-2xl font-semibold text-center">Política de Privacidade do Aplicativo <strong>GOTA D' SOL - VISA</strong></h2>
        <p className="text-muted-foreground">Data de Vigência: {new Date().toLocaleDateString()}</p>

        <p>
          A <strong>GOTA D' SOL - VISA</strong> valoriza sua privacidade e está comprometida em proteger suas informações pessoais. Esta Política de Privacidade descreve como coletamos, usamos, divulgamos e protegemos suas informações ao utilizar nosso aplicativo.
        </p>

        <h3 className="text-xl font-semibold">1. Informações Coletadas</h3>
        <p>
          Coletamos as seguintes categorias de informações:
        </p>

        <ol className="indent-5">
          <li>
            Informações Pessoais: Nome, e-mail, telefone, endereço, dados de pagamento e outras informações fornecidas ao criar uma conta ou realizar reservas.
          </li>
          <li>
            Informações de Uso: Dados sobre como você interage com o aplicativo, incluindo informações de dispositivos, endereços IP, páginas visitadas e tempo gasto.
          </li>
        </ol>

        <h3 className="text-xl font-semibold">2. Uso das Informações</h3>
        <p>
          Utilizamos suas informações para:
          <ol className="indent-5">
            <li>
              Facilitar reservas e pagamentos.
            </li>
            <li>
              Comunicar-se com você sobre sua conta, reservas e promoções.
            </li>
            <li>
              Melhorar nossos serviços e a experiência do usuário.
            </li>
            <li>
              Cumprir obrigações legais e regulatórias.
            </li>
          </ol>
        </p>

        <h3 className="text-xl font-semibold">3. Compartilhamento de Informações</h3>
        <p>
          Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
          <ol className="indent-5">
            <li>
              Fornecedores de Serviços: Empresas parceiras envolvidas na realização de reservas (hotéis, companhias aéreas, etc.).
            </li>
            <li>
              Autoridades Legais: Quando exigido por lei ou para proteger nossos direitos.
            </li>
          </ol>
        </p>

        <h3 className="text-xl font-semibold">4. Segurança das Informações</h3>
        <p>
          Implementamos medidas de segurança razoáveis para proteger suas informações pessoais contra acesso não autorizado, uso ou divulgação. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.
        </p>

        <h3 className="text-xl font-semibold">5. Seus Direitos</h3>
        <p>
          Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco através do e-mail <i className="text-blue-900">gotadesol01@gmail.com</i>.
        </p>

        <h3 className="text-xl font-semibold">6. Cookies e Tecnologias Semelhantes</h3>
        <p>
          O aplicativo pode utilizar cookies e tecnologias semelhantes para melhorar a experiência do usuário. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do aplicativo.

        </p>

        <h3 className="text-xl font-semibold">7. Alterações na Política de Privacidade</h3>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos os Usuários sobre alterações significativas e a versão atualizada estará sempre disponível no aplicativo.
        </p>

        <h3 className="text-xl font-semibold">8. Contato</h3>
        <p>
          Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo e-mail <i className="text-blue-900">gotadesol01@gmail.com</i>.
        </p>
      </div>

      <div className="mt-8">
        <Button onClick={() => window.print()} className="mr-4">
          Imprimir
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          Voltar
        </Button>
      </div>
    </div>
  )
}