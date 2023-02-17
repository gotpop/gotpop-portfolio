import SkillsList from "@/components/skillsList"
import { client } from "client"
import { groq } from "next-sanity"
import styles from "./skills.module.css"

async function getSkills() {
  const query = groq`*[_type == "category"]`
  const data = await client.fetch(query)

  return data
}

export default async function SkillsLayout({ children }: { children: React.ReactNode }) {
  const skills = await getSkills()
  return (
    <>
      <div className={styles.wrap}>
        <SkillsList skills={skills} />
        {children}
      </div>
    </>
  )
}
