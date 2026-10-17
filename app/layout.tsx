import type { Metadata } from 'next'
import { Cormorant_Garamond, Fraunces, Gochi_Hand, Jost, Montserrat, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { RoughFilters } from '@/components/decor/RoughFilters'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { loadRoutes } from '@/lib/specs/loader'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
})

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const routes = loadRoutes()

  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${montserrat.variable} ${fraunces.variable} ${jost.variable} ${gochi.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased bg-[#0f0f12] text-[#f2f2f2]">
        <RoughFilters />
        <Navbar routes={routes} />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
