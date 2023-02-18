import { groq } from 'next-sanity'

export const getProjectsData = groq`
    *[_type == "project"] | order(orderRank)
`

export const getCategoriesData = groq`
    *[_type == "category"] | order(orderRank)
`

export const getProjectDataBySlug = (slug: string) => groq`
    *[_type == "project" && slug.current == "${slug}" && !(_id in path("drafts.**"))]
`

export const getProjectDataSkills = (slug: string) => groq`
    *[_type == "project" && slug.current == "${slug}"]{categories[]->{title, slug {current}}}
`

export const getSkillData = (slug: string) => groq`
    *[_type == "project" && "${slug}" in categories[]->slug.current]{
        title,
        slug,
        mainImage
}
`

export const getTitleData = (slug: string) => groq`
    *[_type == "category" && slug.current == "${slug}"]
`
