import { DiAngularSimple } from 'react-icons/di'
import { DiDrupal } from 'react-icons/di'
import { FaReact } from 'react-icons/fa'
import { GrGraphQl } from 'react-icons/gr'
import { RiVuejsLine } from 'react-icons/ri'
import { RxAccessibility } from 'react-icons/rx'
import { SiAdobe } from 'react-icons/si'
import { SiCsswizardry } from 'react-icons/si'
import { SiCypress } from 'react-icons/si'
import { SiJest } from 'react-icons/si'
import { SiNextdotjs } from 'react-icons/si'
import { SiTypescript } from 'react-icons/si'

type Props = {
  icon: string | undefined
}

export default function Icon({ icon }: Props) {
  const icons = new Map()

  icons.set('angular', DiAngularSimple)
  icons.set('accessability', RxAccessibility)
  icons.set('jest', SiJest)
  icons.set('graphql', GrGraphQl)
  icons.set('typescript', SiTypescript)
  icons.set('scss', SiCsswizardry)
  icons.set('next-js', SiNextdotjs)
  icons.set('adobe-aem', SiAdobe)
  icons.set('drupal', DiDrupal)
  icons.set('cypress', SiCypress)
  icons.set('vue-js', RiVuejsLine)
  icons.set('react', FaReact)

  const Rich = icons.get(icon)

  return <Rich />
}
