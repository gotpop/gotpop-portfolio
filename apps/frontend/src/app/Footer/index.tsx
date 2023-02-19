import { CSSProperties } from 'react'
import Grid from '../../components/Grid'
import GridWrap from '../../components/GridWrap'
import Social from '@components/Social'
import styles from './Footer.module.css'

type props = {
  vars: CSSProperties
}

const Footer = ({ vars }: props) => {
  return (
    <footer className={styles.footer} style={vars}>
      <GridWrap>
        <Grid>
          <>
            <Social />
            <span className={styles.copyright}>
              Copyright © {new Date().getFullYear()}. All rights reserved.
            </span>
          </>
        </Grid>
      </GridWrap>
    </footer>
  )
}

Footer.defaultProps = {
  vars: null
}

export default Footer
