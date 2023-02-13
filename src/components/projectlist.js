import GetImage from "@utils/getImage";
import Image from "next/image";
import Link from "next/link";
import { PhotographIcon } from "@heroicons/react/outline";
import { cx } from "@utils/all";

export default function ProjectList({
  project,
  aspect,
  preloadImage,
}) {
  const imageProps = project?.mainImage
    ? GetImage(project.mainImage)
    : null;

  return (
    <>
      <div className="cursor-pointer group">
          <Link href={`/project/${project.slug.current}`}>
            {imageProps ? (
              <Image
                src={imageProps.src}
                loader={imageProps.loader}
                blurDataURL={imageProps.blurDataURL}
                alt={project.mainImage.alt || "Thumbnail"}
                placeholder="blur"
                // sizes="(max-width: 640px) 90vw, 480px"
                priority={preloadImage ? true : false}
                className="transition-all"
                width={'600'}
                height={'260'}
              />
            ) : (
              <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <PhotographIcon />
              </span>
            )}
          </Link>
        {/* <div
          className={cx(
            "relative overflow-hidden shadow-md transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105",
            aspect === "landscape" ? "aspect-video" : "aspect-square"
          )}>
        </div> */}
      </div>
    </>
  );
}
