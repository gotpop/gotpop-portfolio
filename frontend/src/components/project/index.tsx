import GetImage from "@/utils/getImage"
import Image from "next/image"
import Link from "next/link"
import styles from "./project.module.css"

type Props = {
  project: any
}

export default function ProjectList({ project }: Props) {
  const { mainImage } = project
  console.log('mainImage :', mainImage);

  const imageProps = project?.mainImage
  ? GetImage(project.mainImage)
  : null;

  return (
    <>
      <Link className={styles.link} href={`/projects/${project.slug.current}`}>
        <Image
          src={imageProps.src}
          loader={mainImage.loader}
          blurDataURL={mainImage.blurDataURL}
          alt={mainImage.alt || "Thumbnail"}
          width={"600"}
          height={"400"}
        />
      </Link>
    </>
  )
}

