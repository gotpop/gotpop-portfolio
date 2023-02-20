import { JSXElementConstructor, ReactElement } from 'react'

type props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}

export default function GridWrap({ children }: props) {
  return <div className="gridwrap">{children}</div>
}
