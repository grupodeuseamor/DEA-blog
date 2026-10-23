import type { Metadata } from 'next'
import { Fraunces, Gochi_Hand, Jost, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { RoughFilters } from '@/components/decor/RoughFilters'
import { FaixaAmbiente } from '@/components/layout/FaixaAmbiente'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { isAmbienteDeTeste } from '@/lib/ambiente'
import { loadRoutes } from '@/lib/specs/loader'
import './globals.css'

/* v2 (2.0.0-snapshot): títulos, corpo, bilhetes e citações longas */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
})

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' })

const gochi = Gochi_Hand({ subsets: ['latin'], weight: '400', variable: '--font-gochi' })

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  title: 'Grupo Deus É Amor | Jovens evangelizando Jovens',
  description:
    'Grupo Deus É Amor — jovens evangelizando jovens desde 2000. Oração, fraternidade e formação cristã em Maringá.',
  icons: {
    icon: '/logo-deus-e-amor.png',
    apple: '/logo-deus-e-amor.png',
  },
  // Fora de produção, buscadores não devem indexar o site de testes.
  ...(isAmbienteDeTeste() ? { robots: { index: false, follow: false } } : {}),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const routes = loadRoutes()
  const ambienteDeTeste = isAmbienteDeTeste()

  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${jost.variable} ${gochi.variable} ${newsreader.variable}${ambienteDeTeste ? ' ambiente-teste' : ''}`}
    >
      <body className="font-sans antialiased bg-papel text-tinta">
        <FaixaAmbiente />
        <RoughFilters />
        <Navbar routes={routes} />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && !ambienteDeTeste && <Analytics />}
      </body>
    </html>
  )
}
