import { Key } from 'react'
import Project from '@/components/ProjectItem'
import { client } from '@/lib/sanity.client'
import { getProjectsData } from '@/lib/sanity.queries'
import styles from './page.module.css'

async function getProjects() {
  const data = await client.fetch(getProjectsData)

  return data
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className={styles.grid}>
      {projects.map((project: { _id: Key | null | undefined }) => (
        <>
          <Project key={project._id} project={project} />
        </>
      ))}
    </div>
  )
}
