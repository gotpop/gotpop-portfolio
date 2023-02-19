import '../styles/app.css'

import { ReactElement, Suspense } from 'react'

import Footer from '@components/Footer'
import Grid from '@components/Grid'
import GridWrap from '@components/GridWrap'
import Header from '@components/Header'
import { Inter } from '@next/font/google'
import Loading from './loading'
import siteStyles from './site.module.css'
import styles from './layout.module.css'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={inter.className}>
        <div className={siteStyles.site}>
          <Header />
          <GridWrap>
            <Grid>
              <main className={styles.main}>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </main>
            </Grid>
          </GridWrap>
          <Footer />
        </div>
      </body>
    </html>
  )
}
