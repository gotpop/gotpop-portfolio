import GetImage from '@utils/getImage'
import Image from 'next/image'
import Link from 'next/link'

type PropsImport = {
  project: any
}

export default function Project({ project }: PropsImport) {
  const { mainImage } = project
  const imageProps = GetImage(project.mainImage)

  return (
    <>
      <Link href={`/projects/${project.slug.current}`}>
        {imageProps ? (
          <Image
            src={imageProps.src}
            loader={mainImage.loader}
            alt={mainImage.alt || 'Thumbnail'}
            width={'600'}
            height={'400'}
          />
        ) : null}
      </Link>
    </>
  )
}
