import GetImage from "@/utils/getImage"
import Image from "next/image"
import Link from "next/link"
import styles from "./projectSingle.module.css"

type Props = {
  project: any
}

export default function ProjectSingle({ project }: Props) {
  const { mainImage } = project
  // console.log('mainImage :', mainImage);

  const imageProps = project?.mainImage
  ? GetImage(project.mainImage)
  : null;

  return (
    <>
        <Image
          src={imageProps.src}
          loader={mainImage.loader}
          blurDataURL={mainImage.blurDataURL}
          alt={mainImage.alt || "Thumbnail"}
          width={"600"}
          height={"400"}
        />
    </>
  )
}

