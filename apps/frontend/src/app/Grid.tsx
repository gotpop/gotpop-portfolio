import { CSSProperties, ReactElement } from 'react'

type props = {
  children: ReactElement
  vars?: CSSProperties
}

export default function Grid({ children, vars }: props) {
  return (
    <div className="grid" style={vars}>
      {children}
    </div>
  )
}
