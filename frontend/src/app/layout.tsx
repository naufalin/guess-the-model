import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guess the Model',
  description: 'A hobby project to guess AI models',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
