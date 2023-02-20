import { BiCode } from 'react-icons/bi'
import { CSSProperties } from 'react'
import Grid from './Grid'
import GridWrap from '@app/GridWrap'
import Link from 'next/link'
import LogoSVG from '@app/LogoSVG'

type Props = {
  vars: CSSProperties | undefined
}

const Header = ({ vars }: Props) => {
  return (
    <header className="header" style={vars}>
      <GridWrap>
        <Grid>
          <>
            <LogoSVG />
            <nav className="nav">
              <Link href={`/skills`} data-cy="link-skills">
                <span>Skills</span>
                <BiCode />
              </Link>
            </nav>
          </>
        </Grid>
      </GridWrap>
    </header>
  )
}

Header.defaultProps = {
  vars: undefined
}

export default Header
