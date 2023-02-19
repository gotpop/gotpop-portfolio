import SkillsList from '@app/SkillsListItem'
import { client } from '@lib/sanity.client'
import { getCategoriesData } from '@lib/sanity.queries'
import { Suspense } from 'react'
import Loading from './loading'
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
        <Suspense fallback={<Loading />}>
          <SkillsList skills={skills} />
        </Suspense>
        {children}
      </div>
    </>
  )
}
