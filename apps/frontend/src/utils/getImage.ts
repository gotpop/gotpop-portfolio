import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { client } from "@/lib/sanity.client";
import { useNextSanityImage } from "next-sanity-image";

export default function GetImage(image: SanityAsset): SanityAsset | null {
  const imageProps = useNextSanityImage(client, image);

  if (!image || !image.asset) {
    return null;
  }

  return imageProps;
}
