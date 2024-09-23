
export default function Component({ params }: { params: { facturaId: string }}){
  const id = params.facturaId
  
  return (
    <div className="text-center">
      <h1>Page</h1>
      <p>{id}</p>
    </div>
  )
}