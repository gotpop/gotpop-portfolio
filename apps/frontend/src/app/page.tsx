import Project from '@app/ProjectItem'
import { ProjectType } from '@lib/sanity.types'
import { client } from '@lib/sanity.client'
import { getProjectsData } from '@lib/sanity.queries'
import styles from './page.module.css'

async function getProjects() {
  const data = await client.fetch(getProjectsData)

  return data
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className={styles.grid}>
      {projects.map((project: ProjectType) => (
        <>
          <Project key={project.slug.current} project={project} />
        </>
      ))}
    </div>
  )
}
