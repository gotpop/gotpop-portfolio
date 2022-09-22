import Image from "next/image";
import Link from "next/link";
import { cx } from "@utils/all";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { PhotographIcon } from "@heroicons/react/outline";
import CategoryLabel from "@components/projects/category";

export default function ProjectList({ project, aspect, preloadImage, objectFit = 'cover' }) {
  const imageProps = project?.mainImage
    ? GetImage(project.mainImage)
    : null;
  // const AuthorimageProps = project?.author?.image
  //   ? GetImage(project.author.image)
  //   : null;
  return (
    <>
      <div className="cursor-pointer group">
        <div
          className={cx(
            "relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105",
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
                  // sizes="80vw"
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
        {/* <CategoryLabel categories={project.categories} />
        <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
          <Link href={`/project/${project.slug.current}`}>
            <span
              className="     bg-gradient-to-r from-green-200 to-green-100 dark:from-purple-800 dark:to-purple-900
          bg-[length:0px_10px]
          bg-left-bottom
          bg-no-repeat
          transition-[background-size]
          duration-500
          hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
              {project.title}
            </span>
          </Link>
        </h2> */}

        <div className="hidden">
          {project.excerpt && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              <Link href={`/project/${project.slug.current}`}>
                {project.excerpt}
              </Link>
            </p>
          )}
        </div>

        {/* <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 w-5 h-5">
              {project.author.image && (
                <Image
                  src={AuthorimageProps.src}
                  blurDataURL={AuthorimageProps.blurDataURL}
                  loader={AuthorimageProps.loader}
                  objectFit="cover"
                  layout="fill"
                  alt={project?.author?.name}
                  placeholder="blur"
                  sizes="30px"
                  className="rounded-full"
                />
              )}
            </div>
            <span className="text-sm">{project.author.name}</span>
          </div>
          <span className="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <time
            className="text-sm"
            dateTime={project?.publishedAt || project._createdAt}>
            {format(
              parseISO(project?.publishedAt || project._createdAt),
              "MMMM dd, yyyy"
            )}
          </time>
        </div> */}
      </div>
    </>
  );
}
