import ProjectList from "@/components/project"
import { client } from "client"
import { groq } from "next-sanity"
import styles from "./skill.module.css"

async function getSkill(idVar: any) {
  const query = groq`*[_type == "project" && "${idVar}" in categories[]->slug.current]{
    title,
    slug,
    mainImage
    }
    `

  const data = await client.fetch(query)

  return data
}

export default async function Skill({ params }: any) {
  const projects = await getSkill(params.id)

  return (
    <>
      <h2 className={styles.title}>{params.id}</h2>
      <div className={styles.grid}>
        {projects.map((project: any) => (
          <ProjectList key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}
