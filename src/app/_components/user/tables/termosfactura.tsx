import { IFactura, IFacturaPrint } from "@/types"
import ReactMarkdown from "react-markdown"


interface ITermoFactura {
  factura: IFacturaPrint
}
export const TermoFactura: React.FC<ITermoFactura> = ({ factura }) => {
  const contrato = `# TERMO DE ISENÇÃO DE RESPONSABILIDADE

      ## 1. OBJETO DO SERVIÇO
      A Gota D' Sol Comércio Geral & Prestação de Serviço, (SU) LDA, inscrita com o NIF 5001292218, com sede em Destrito urbano do sambizanga, junto a Loja da AngoMarte do Ngola-Kilunge no prédio do Banco BIC 2º Andar, 0055-Luanda,, doravante denominada "ASSESSORA", prestará serviço de assessoria documental e orientação para o processo de solicitação de visto. O serviço inclui auxílio na organização dos documentos exigidos e na correta submissão do pedido junto às autoridades competentes.

      ## 2. LIMITAÇÃO DE RESPONSABILIDADE
      A ASSESSORA declara que sua prestação de serviço é estritamente informativa e burocrática, não garantindo, em nenhuma hipótese, a aprovação do visto pelo órgão emissor. A decisão final sobre a concessão do visto é de responsabilidade exclusiva das autoridades consulares e imigratórias.

      ## 3. EXCLUSÃO DE RESPONSABILIDADE
      A ASSESSORA não se responsabiliza por:
      - Recusas, atrasos ou exigências adicionais por parte das autoridades emissoras do visto;
      - Erros ou omissões nas informações prestadas pelo CLIENTE que possam impactar o processo;
      - Alterações nas políticas ou requisitos consulares ocorridas após a submissão do pedido;
      - Consequências advindas de documentação falsa ou inconsistente fornecida pelo CLIENTE.

      ## 4. OBRIGAÇÕES DO CLIENTE
      O CLIENTE se compromete a fornecer informações verdadeiras e completas, bem como a atender aos prazos e requisitos exigidos pelo órgão consular.

      ## 5. ACEITE
      Ao efetuar o pagamento da fatura, o CLIENTE declara estar ciente e de acordo com os termos e condições deste documento.

      Por ser a expressão de sua livre vontade, firma - se o presente termo.

      Luanda, aos ${Date.now().toLocaleString()}

      ** ${factura.cliente.nome} **
      Cliente ID: ${factura.cliente.id}

      ** Gota D' Sol Comércio Geral & Prestação de Serviço, (SU) LDA **
      NIF: 5001292218`
  return (
    <div className="">
      <ReactMarkdown children={contrato} />      
    </div>
  )
}