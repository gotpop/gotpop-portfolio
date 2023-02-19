import { PortableTextBlock, SlugValue } from "sanity"

import { SanityAsset } from "@sanity/image-url/lib/types/types"

export type CategoryType = {
    title: string
    slug: SlugValue
}

type LinkedIn = {
    displaylinkedin: boolean,
    href: string
}

export type ProjectType = {
    body: PortableTextBlock
    categories: CategoryType[]
    excerpt: string,
    linkedin: LinkedIn,
    mainImage: SanityAsset,
    orderRank: string,
    slug: SlugValue,
    title: string
}

export type SlugProps = {
    params: {
        slug: string
    }
}
