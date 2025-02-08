import { CreateVencimento } from "@/app/_components";



export default function Vencimento({ params }: { params: { profileId: string } }) {
  const id = params.profileId
  
  return (
    <CreateVencimento />
  )
}