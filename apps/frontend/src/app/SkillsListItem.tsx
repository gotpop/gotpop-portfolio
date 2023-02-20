import { CategoryType } from '@lib/sanity.types'
import Link from 'next/link'

type Props = {
  skills: CategoryType[]
}

export default function SkillsList({ skills }: Props) {
  return (
    <>
      <article className="skills-list__wrap">
        {skills.map((skill: CategoryType, i: number) => {
          return (
            <Link
              key={i}
              className="skills-list__link"
              href={`/skills/${skill.slug.current}`}
            >
              {skill.title}
            </Link>
          )
        })}
      </article>
    </>
  )
}
