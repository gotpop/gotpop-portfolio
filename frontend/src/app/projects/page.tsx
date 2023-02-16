import ProjectList from "@/components/project"
import { client } from "client"
import { groq } from "next-sanity"
import styles from "./projects.module.css"

async function getProjects() {
  const query = groq`*[_type == "project"] | order(orderRank)`
  const data = await client.fetch(query)

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
