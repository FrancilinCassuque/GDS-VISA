import { IContacto } from "@/types"

interface ITwinProps {
  contacto: IContacto
}
export const ShowTwin: React.FC<ITwinProps> = ({ contacto }) => {
  return (
    <div className="grid ">
      <div className="grid-cols-2">
        <p className="text-center">{contacto.nome}</p>
        <p className="text-center">{contacto.telefone}</p>
      </div>

      <div className="grid-cols-1">
        <p className="text-center">{contacto.descricao}</p>
      </div>
    </div>
  )
}