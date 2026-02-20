import './globals.css'

export const metadata = {
  title: 'ПАКЕТ 197: STRATEGIC ADVISOR',
  description: 'Sovereign Architecture Analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body className="antialiased">{children}</body>
    </html>
  )
}
