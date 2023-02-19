import { ProjectType, SlugProps } from '@lib/sanity.types'
import {
  getCategoriesData,
  getSkillData,
  getTitleData
} from '@lib/sanity.queries'

import ProjectList from '@components/ProjectItem'
import { SlugValue } from 'sanity'
import { client } from '@lib/sanity.client'
import styles from './skill.module.css'

async function getSkill(slug: string) {
  const query = getSkillData(slug)
  const data = await client.fetch(query)

  return data
}

async function getTitle(slug: string) {
  const query = getTitleData(slug)
  const data = await client.fetch(query)

  return data[0]
}

export default async function Skill({ params }: SlugProps) {
  const { slug } = params
  const projects = await getSkill(slug)
  const { title } = await getTitle(slug)

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {projects.map((project: ProjectType) => (
          <ProjectList key={project.slug.current} project={project} />
        ))}
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const data = await client.fetch(getCategoriesData)

  return data.map((category: { slug: SlugValue }) => ({
    slug: category.slug.current
  }))
}
