import { client } from "client";
import { useNextSanityImage } from "next-sanity-image";

export default function GetImage(image: any, CustomImageBuilder = null) {
  const imageProps = useNextSanityImage(client, image, {
    imageBuilder: CustomImageBuilder ? CustomImageBuilder : undefined
  });
  if (!image || !image.asset) {
    return null;
  }
  return imageProps;
}
