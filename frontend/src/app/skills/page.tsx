import ProjectList from "@/components/project"
import SkillsList from "@/components/skillsList"
import { client } from "client"
import { groq } from "next-sanity"
import styles from "./skills.module.css"

async function getSkills() {
  const query = groq`*[_type == "category"]`
  const data = await client.fetch(query)

  return data
}

async function getProjects() {
  const query = groq`*[_type == "project"]`
  const data = await client.fetch(query)

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
