import ProjectList from '@/components/ProjectItem'
import { client } from '@/lib/sanity.client'
import { getProjectsData } from '@/lib/sanity.queries'
import styles from './projects.module.css'

async function getProjects() {
  const data = await client.fetch(getProjectsData)

  return data
}

export default async function About() {
  const projects = await getProjects()

  return (
    <>
      <section className={styles.grid}>
        {projects.map((project: any) => (
          <>
            <ProjectList key={project._id} project={project} />
          </>
        ))}
      </section>
    </>
  )
}
