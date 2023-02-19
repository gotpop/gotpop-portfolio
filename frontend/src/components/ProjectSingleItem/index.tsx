import GetImage from '@utils/getImage'
import Image from 'next/image'
import { ProjectType } from '@lib/sanity.types'

type Props = {
  project: ProjectType
}

export default function ProjectSingle({ project }: Props) {
  const { mainImage } = project
  const imageProps = GetImage(project.mainImage)

  return (
    <>
      {imageProps ? (
        <Image
          src={imageProps.src}
          loader={mainImage.loader}
          blurDataURL={mainImage.blurDataURL}
          alt={mainImage.alt || 'Thumbnail'}
          width={'600'}
          height={'400'}
        />
      ) : null}
    </>
  )
}
