import {
  getProjectDataBySlug,
  getProjectDataSkills,
  getProjectsData
} from '@lib/sanity.queries'

import Pagination from '@app/Pagination'
import { PortableText } from '@portabletext/react'
import ProjectSingle from './Project'
import SkillsList from '@app/SkillsListItem'
import { SlugProps } from '@lib/sanity.types'
import { SlugValue } from '@sanity/types'
import { client } from '@lib/sanity.client'

async function getProject(slug: string) {
  const query = getProjectDataBySlug(slug)
  const data = await client.fetch(query)

  return data
}

async function getProjectSkills(slug: string) {
  const query = getProjectDataSkills(slug)
  const data = await client.fetch(query)

  return data
}

async function getProjects() {
  const data = await client.fetch(getProjectsData)

  return data
}

export default async function Project({ params }: SlugProps) {
  const { slug } = params
  const project = await getProject(slug)
  const singleProject = project[0]

  const projectSkills = await getProjectSkills(slug)
  const categories = await projectSkills[0].categories

  const projects = await getProjects()

  return (
    <div className="project__wrap">
      <SkillsList skills={categories} />
      <div className="project">
        <article className="project__content">
          <h2 className="project__title">{singleProject.title}</h2>
          <PortableText value={singleProject.body} />
        </article>
        <figure className="project__figure">
          <ProjectSingle project={singleProject} />
        </figure>
      </div>
      <Pagination post={singleProject} projects={projects} />
    </div>
  )
}

export async function generateStaticParams() {
  const data = await client.fetch(getProjectsData)

  return data.map((project: { slug: SlugValue }) => ({
    slug: project.slug.current
  }))
}
