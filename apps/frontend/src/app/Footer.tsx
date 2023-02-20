import { CSSProperties } from 'react'
import Grid from '@app/Grid'
import GridWrap from '@app/GridWrap'
import Social from '@app/Social'

type props = {
  vars: CSSProperties
}

const Footer = ({ vars }: props) => {
  return (
    <footer className="footer" style={vars}>
      <GridWrap>
        <Grid>
          <>
            <Social />
            <span className="copyright">
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
