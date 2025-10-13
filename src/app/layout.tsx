import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DSS Local Dashboard',
  description:
    'Social Determinants of Health monitoring dashboard for local governments',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
