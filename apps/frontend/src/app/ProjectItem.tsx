import GetImage from '@utils/getImage'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectType } from '@lib/sanity.types'

type Props = {
  project: ProjectType
}

export default function Project({ project }: Props) {
  const { mainImage } = project
  const imageProps = GetImage(project.mainImage)

  return (
    <>
      <Link className="project-link" href={`/projects/${project.slug.current}`}>
        {imageProps ? (
          <Image
            src={imageProps.src}
            alt={mainImage.alt || 'Thumbnail'}
            width={'600'}
            height={'400'}
          />
        ) : null}
      </Link>
    </>
  )
}
