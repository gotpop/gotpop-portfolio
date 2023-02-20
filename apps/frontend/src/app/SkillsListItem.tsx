// TODO typo! accessibility
import { CategoryType } from '@lib/sanity.types'
import Icon from '@components/icon'
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
              <span>{skill.title}</span>
              <Icon icon={skill.slug.current} />
            </Link>
          )
        })}
      </article>
    </>
  )
}
