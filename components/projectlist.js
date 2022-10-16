import Image from "next/image";
import Link from "next/link";
import { cx } from "@utils/all";
import GetImage from "@utils/getImage";
import { PhotographIcon } from "@heroicons/react/outline";

export default function ProjectList({ project, aspect, preloadImage, objectFit = 'cover' }) {
  const imageProps = project?.mainImage
    ? GetImage(project.mainImage)
    : null;

  return (
    <>
      <div className="cursor-pointer group">
        <div
          className={cx(
            "relative overflow-hidden shadow-md transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105",
            aspect === "landscape" ? "aspect-video" : "aspect-square"
          )}>
          <Link href={`/project/${project.slug.current}`}>
            <a>
              {imageProps ? (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={project.mainImage.alt || "Thumbnail"}
                  placeholder="blur"
                  sizes="(max-width: 640px) 90vw, 480px"
                  layout="fill"
                  objectFit={objectFit}
                  objectPosition= "0 0"
                  priority={preloadImage ? true : false}
                  className="transition-all"
                />
              ) : (
                <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <PhotographIcon />
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
