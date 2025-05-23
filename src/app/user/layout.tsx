export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="#">
      {children}
    </div>
  )
}
