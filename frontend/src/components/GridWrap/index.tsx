import { JSXElementConstructor, ReactElement } from 'react'

import styles from './GridWrap.module.css'

type props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}

export default function GridWrap({ children }: props) {
  return (
    <div className={styles.gridwrap}>
      {children}
    </div>
  )
}
