import '../styles/app.css'

import { JSXElementConstructor, ReactElement } from 'react'

import Footer from '@/components/Footer'
import Grid from '@/components/Grid'
import GridWrap from '@/components/GridWrap'
import Header from '@/components/Header'
import { Inter } from '@next/font/google'
import siteStyles from './site.module.css'
import styles from './layout.module.css'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({
  children
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}) {
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
          <main className={styles.main}>
            <GridWrap>
              <Grid>{children}</Grid>
            </GridWrap>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
