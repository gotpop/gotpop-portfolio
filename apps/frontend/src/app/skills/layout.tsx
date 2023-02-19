import SkillsList from '@components/SkillsListItem'
import { client } from '@lib/sanity.client'
import { getCategoriesData } from '@lib/sanity.queries'
import styles from './skills.module.css'

async function getSkills() {
  const data = await client.fetch(getCategoriesData)

  return data
}

export default async function SkillsLayout({
  children
}: {
  children: React.ReactNode
}) {
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
