import { Key } from 'react'
import Project from '@/components/ProjectItem'
import { client } from 'client'
import { groq } from 'next-sanity'
import styles from './page.module.css'

async function getProjects() {
  const data = await client.fetch(
    groq`*[_type == "project"] | order(orderRank)`
  )

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
