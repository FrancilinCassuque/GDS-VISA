'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export const GDSTermsEndPrivacy: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Legal Information</h1>

      <div className="flex items-center space-x-2 mb-6">
        <Switch
          id="policy-toggle"
          checked={showPrivacy}
          onCheckedChange={setShowPrivacy}
        />
        <Label htmlFor="policy-toggle">
          {showPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </Label>
      </div>

      {!showPrivacy ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Termos e Condições de Uso do Aplicativo GOTA D' SOL - VISA</h2>
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h3 className="text-xl font-semibold">1. Aceitação dos Termos</h3>
          <p>
            Ao acessar e utilizar o aplicativo da Agência GOTA D' SOL - VISA, você concorda em estar vinculado a estes Termos e Condições. Caso não concorde com alguma disposição, recomenda-se que não utilize o aplicativo.
          </p>

          <h3 className="text-xl font-semibold">2. Definições</h3>
          <p>
            Para fins destes Termos, os seguintes termos têm os seguintes significados:
            <ol>
              <li>
                <strong>Aplicativo</strong> refere-se ao software disponibilizado pela GOTA D' SOL - VISA.
              </li>
              <li>
                <strong>Usuário</strong> refere-se a qualquer indivíduo que utiliza o aplicativo.
              </li>
            </ol>
          </p>

          <h3 className="text-xl font-semibold">3. Uso do Aplicativo</h3>
          <p>
            O aplicativo destina-se exclusivamente a fins pessoais e não comerciais. O Usuário concorda em não utilizar o aplicativo para atividades ilegais ou não autorizadas e a respeitar todas as leis aplicáveis.
          </p>

          <h3 className="text-xl font-semibold">4. Registro e Criação de Conta</h3>
          <p>
            Para acessar determinadas funcionalidades do aplicativo, pode ser necessário criar uma conta. O Usuário é responsável pela precisão e atualização das informações fornecidas e pela manutenção da confidencialidade de suas credenciais de acesso.
          </p>

          <h3 className="text-xl font-semibold">5. Reservas e Pagamentos</h3>
          <p>
            O Usuário concorda em fornecer informações precisas ao realizar reservas. As transações financeiras devem ser realizadas através dos métodos de pagamento disponíveis no aplicativo. A GOTA D' SOL - VISA reserva-se o direito de alterar preços e tarifas a qualquer momento, sem aviso prévio.
          </p>

          <h3 className="text-xl font-semibold">6. Políticas de Cancelamento e Alterações</h3>
          <p>
            As políticas de cancelamento variam de acordo com cada fornecedor. O Usuário deve consultar as condições específicas de cada reserva antes de sua confirmação. Alterações nas reservas estão sujeitas às políticas do fornecedor.
          </p>

          <h3 className="text-xl font-semibold">7. Modificações nos Termos</h3>
          <p>
            A GOTA D' SOL - VISA reserva-se o direito de modificar estes Termos e Condições a qualquer momento. O Usuário será notificado sobre alterações significativas e o uso contínuo do aplicativo implicará na aceitação das mudanças.
          </p>

          <h3 className="text-xl font-semibold">8. Limitação de Responsabilidade</h3>
          <p>
            A GOTA D' SOL - VISA não se responsabiliza por danos diretos, indiretos, acidentais ou consequenciais decorrentes do uso ou da incapacidade de uso do aplicativo, incluindo, mas não se limitando, a perdas financeiras, interrupção de negócios ou danos à reputação.
          </p>

          <h3 className="text-xl font-semibold">9. Propriedade Intelectual</h3>
          <p>
            Todo o conteúdo, incluindo textos, gráficos, logos e software, contidos no aplicativo são de propriedade da GOTA D' SOL - VISA ou de seus licenciantes e estão protegidos por leis de propriedade intelectual.
          </p>

          <h3 className="text-xl font-semibold">10. Lei Aplicável</h3>
          <p>
            Estes Termos e Condições serão regidos pelas leis do Governo da Republica de Angola, e qualquer disputa relacionada será dirimida nos tribunais competentes.
          </p>

          <h3 className="text-xl font-semibold">11. Contato</h3>
          <p>
            Para dúvidas ou esclarecimentos, entre em contato através do e-mail <i>gotadesol01@gmail.com</i>.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Política de Privacidade do Aplicativo GOTA D' SOL - VISA</h2>
          <p>Data de Vigência: {new Date().toLocaleDateString()}</p>

          <p>
            A [Nome da Agência] valoriza sua privacidade e está comprometida em proteger suas informações pessoais. Esta Política de Privacidade descreve como coletamos, usamos, divulgamos e protegemos suas informações ao utilizar nosso aplicativo.
          </p>

          <h3 className="text-xl font-semibold">1. Informações Coletadas</h3>
          <p>
            Coletamos as seguintes categorias de informações:

            <ol>
              <li>
                Informações Pessoais: Nome, e-mail, telefone, endereço, dados de pagamento e outras informações fornecidas ao criar uma conta ou realizar reservas.
              </li>
              <li>
                Informações de Uso: Dados sobre como você interage com o aplicativo, incluindo informações de dispositivos, endereços IP, páginas visitadas e tempo gasto.

              </li>
            </ol>
          </p>

          <h3 className="text-xl font-semibold">2. Uso das Informações</h3>
          <p>
            Utilizamos suas informações para:
            <ol>
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
            <ol>
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
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco através do e-mail [e-mail da agência].
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
            Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo e-mail [e-mail da agência].
          </p>
        </div>
      )}

      <div className="mt-8">
        <Button onClick={() => window.print()} className="mr-4">
          Print
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
      </div>
    </div>
  )
}