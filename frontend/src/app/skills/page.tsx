import { getCategoriesData, getProjectsData } from '@/lib/sanity.queries'

import ProjectList from '@/components/ProjectItem'
import { client } from '@/lib/sanity.client'
import styles from './skills.module.css'

async function getSkills() {
  const data = await client.fetch(getCategoriesData)

  return data
}

async function getProjects() {
  const data = await client.fetch(getProjectsData)

  return data
}

export default async function Skills() {
  const skills = await getSkills()
  const projects = await getProjects()

  return (
    <div className={styles.grid}>
      {projects.map((project: any) => (
        <ProjectList key={project._id} project={project} />
      ))}
    </div>
  )
}
