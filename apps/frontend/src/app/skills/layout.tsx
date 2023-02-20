import SkillsList from '@app/SkillsListItem'
import { client } from '@lib/sanity.client'
import { getCategoriesData } from '@lib/sanity.queries'
import { ReactNode } from 'react'

async function getSkills() {
  const data = await client.fetch(getCategoriesData)

  return data
}

export default async function SkillsLayout({
  children
}: {
  children: ReactNode
}) {
  const skills = await getSkills()

  return (
    <>
      <div className="grid">
        <SkillsList skills={skills} />
        {children}
      </div>
    </>
  )
}
