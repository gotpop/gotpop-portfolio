import { client } from "client";
import { useNextSanityImage } from "next-sanity-image";

type ImgProps = {
  src: string
  width: number
  height: number
}

export default function GetImage(image: { asset: any } | null): ImgProps | null {
  const imageProps = useNextSanityImage(client, image);

  if (!image || !image.asset) {
    return null;
  }

  return imageProps;
}
