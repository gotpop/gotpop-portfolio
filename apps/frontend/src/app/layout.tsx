import '../styles/app.css'

import { ReactElement } from 'react'

import Footer from '@app/Footer'
import Grid from '@app/Grid'
import GridWrap from '@app/GridWrap'
import Header from '@app/Header'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <div className="site">
          <Header />
          <GridWrap>
            <Grid>
              <main className="main">{children}</main>
            </Grid>
          </GridWrap>
          <Footer />
        </div>
      </body>
    </html>
  )
}
