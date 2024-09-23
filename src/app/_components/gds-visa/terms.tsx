'use client'

import { Button } from "@/components/ui/button"

export const GDSTerms: React.FC = () => {

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-4 text-justify">
        <h2 className="text-2xl font-semibold text-center">Termos e Condições de Uso do Aplicativo GOTA D' SOL - VISA</h2>
        <p className="text-muted-foreground">Data de Vigência: {new Date().toLocaleDateString()}</p>

        <h3 className="text-xl font-semibold">1. Aceitação dos Termos</h3>
        <p>
          Ao acessar e utilizar o aplicativo da Agência <strong>GOTA D' SOL - VISA</strong>, você concorda em estar vinculado a estes Termos e Condições. Caso não concorde com alguma disposição, recomenda-se que não utilize o aplicativo.
        </p>

        <h3 className="text-xl font-semibold">2. Definições</h3>
        <p>
          Para fins destes Termos, os seguintes termos têm os seguintes significados:
          <ol className="indent-5">
            <li>
              <strong>Aplicativo</strong> refere-se ao software disponibilizado pela <strong>GOTA D' SOL - VISA</strong>.
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
          O Usuário concorda em fornecer informações precisas ao realizar reservas. As transações financeiras devem ser realizadas através dos métodos de pagamento disponíveis no aplicativo. A <strong>GOTA D' SOL - VISA</strong> reserva-se o direito de alterar preços e tarifas a qualquer momento, sem aviso prévio.
        </p>

        <h3 className="text-xl font-semibold">6. Políticas de Cancelamento e Alterações</h3>
        <p>
          As políticas de cancelamento variam de acordo com cada fornecedor. O Usuário deve consultar as condições específicas de cada reserva antes de sua confirmação. Alterações nas reservas estão sujeitas às políticas do fornecedor.
        </p>

        <h3 className="text-xl font-semibold">7. Modificações nos Termos</h3>
        <p>
          A <strong>GOTA D' SOL - VISA</strong> reserva-se o direito de modificar estes Termos e Condições a qualquer momento. O Usuário será notificado sobre alterações significativas e o uso contínuo do aplicativo implicará na aceitação das mudanças.
        </p>

        <h3 className="text-xl font-semibold">8. Limitação de Responsabilidade</h3>
        <p>
          A <strong>GOTA D' SOL - VISA</strong> não se responsabiliza por danos diretos, indiretos, acidentais ou consequenciais decorrentes do uso ou da incapacidade de uso do aplicativo, incluindo, mas não se limitando, a perdas financeiras, interrupção de negócios ou danos à reputação.
        </p>

        <h3 className="text-xl font-semibold">9. Propriedade Intelectual</h3>
        <p>
          Todo o conteúdo, incluindo textos, gráficos, logos e software, contidos no aplicativo são de propriedade da <strong>GOTA D' SOL - VISA</strong> ou de seus licenciantes e estão protegidos por leis de propriedade intelectual.
        </p>

        <h3 className="text-xl font-semibold">10. Lei Aplicável</h3>
        <p>
          Estes Termos e Condições serão regidos pelas leis do Governo da Republica de Angola, e qualquer disputa relacionada será dirimida nos tribunais competentes.
        </p>

        <h3 className="text-xl font-semibold">11. Contato</h3>
        <p>
          Para dúvidas ou esclarecimentos, entre em contato através do e-mail <i className="text-blue-900">gotadesol01@gmail.com</i>.
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