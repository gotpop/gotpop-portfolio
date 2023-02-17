import GetImage from '@/utils/getImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from './project.module.css'

type PropsImport = {
  project: any
}

export default function Project({ project }: PropsImport) {
  const { mainImage } = project
  const imageProps = GetImage(project.mainImage)

  return (
    <>
      <Link className={styles.link} href={`/projects/${project.slug.current}`}>
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
