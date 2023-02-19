import ProjectList from '@app/ProjectItem'
import { ProjectType } from '@lib/sanity.types'
import { client } from '@lib/sanity.client'
import { getProjectsData } from '@lib/sanity.queries'
import styles from './projects.module.css'

async function getProjects() {
  const data = await client.fetch(getProjectsData)

  return data
}

export default async function Projects() {
  const projects = await getProjects()

  return (
    <>
      <section className={styles.grid}>
        {projects.map((project: ProjectType) => (
          <>
            <ProjectList key={project.slug.current} project={project} />
          </>
        ))}
      </section>
    </>
  )
}
