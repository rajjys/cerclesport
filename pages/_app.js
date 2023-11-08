import { Layout } from '@/components'
import { Manrope } from 'next/font/google'
import '@/styles/globals.css'

const manrope = Manrope({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return <main className={manrope.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout> 
        </main>
}
