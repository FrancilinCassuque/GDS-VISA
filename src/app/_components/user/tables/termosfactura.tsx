import { IFactura, IFacturaPrint } from "@/types"

interface ITermoFactura {
  factura: IFacturaPrint
}
export const TermoFactura: React.FC<ITermoFactura> = ({ factura }) => {
  const hoje = Date.now()
  const hojeFormatado = new Date(hoje).toLocaleDateString('Br', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  return (
    <div className="text-justify indent-4">
      <h2 className="text-2xl font-bold text-center my-4">TERMO DE ISENÇÃO DE RESPONSABILIDADE</h2>

      <h3 className="text-xl font-bold mt-6 mb-2">1. OBJETO DO SERVIÇO</h3>
      <p className="">
        A Gota D' Sol Comércio Geral & Prestação de Serviço, (SU) LDA, inscrita com o NIF 5001292218, com sede em Destrito urbano do sambizanga, junto a Loja da AngoMarte do Ngola-Kilunge no prédio do Banco BIC 2º Andar, 0055-Luanda, doravante denominada "ASSESSORA", prestará serviço de assessoria documental e orientação para o processo de solicitação de visto. O serviço inclui auxílio na organização dos documentos exigidos e na correta submissão do pedido junto às autoridades competentes.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-2">2. LIMITAÇÃO DE RESPONSABILIDADE</h3>
      <p className="">
        A ASSESSORA declara que sua prestação de serviço é estritamente informativa e burocrática, não garantindo, em nenhuma hipótese, a aprovação do visto pelo órgão emissor. A decisão final sobre a concessão do visto é de responsabilidade exclusiva das autoridades consulares e imigratórias.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-2">3. EXCLUSÃO DE RESPONSABILIDADE</h3>
      <p className="">
        A ASSESSORA não se responsabiliza por:
      </p>      
      <ul className="mb-4">
        <li className="">- Recusas, atrasos ou exigências adicionais por parte das autoridades emissoras do visto;</li>
        <li>- Erros ou omissões nas informações prestadas pelo CLIENTE que possam impactar o processo;</li>
        <li>- Alterações nas políticas ou requisitos consulares ocorridas após a submissão do pedido;</li>
        <li>- Consequências advindas de documentação falsa ou inconsistente fornecida pelo CLIENTE.</li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-2">4. OBRIGAÇÕES DO CLIENTE</h3>
      <p className="">
        O CLIENTE se compromete a fornecer informações verdadeiras e completas, bem como a atender aos prazos e requisitos exigidos pelo órgão consular.
      </p>

      <h3 className="text-xl font-bold mt-4 mb-2">5. ACEITE</h3>
      <p className=""> Ao efetuar o pagamento da fatura, o CLIENTE declara estar ciente e de acordo com os termos e condições deste documento.</p>
      <p className=" mt-4">Por ser a expressão de sua livre vontade, firma - se o presente termo.</p>

      <p className=""><i>Luanda, {hojeFormatado}</i></p>

      <p className="font-bold mt-5"> <i>{factura.cliente.nome}</i> </p>
      <p className="text-muted-foreground">Cliente ID: {factura.cliente.id}</p>

      <p className="font-bold"><i>Gota D' Sol Comércio Geral & Prestação de Serviço, (SU) LDA</i></p>
      {/* <p className="text-muted-foreground">NIF: 5001292218</p> */}
    </div>
  )
}