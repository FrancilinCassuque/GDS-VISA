

export default function Component({ params }: { params: { processoId: string } }) {
  const id = params.processoId

  return (
    <div className="text-center">
      <h1>Page</h1>
      <p>{id}</p>
    </div>
  )
}