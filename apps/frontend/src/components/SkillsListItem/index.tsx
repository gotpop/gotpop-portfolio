import { CategoryType } from '@lib/sanity.types'
import Link from 'next/link'
import styles from './skillsList.module.css'

type Props = {
  skills: CategoryType[]
}

export default function SkillsList({ skills }: Props) {
  return (
    <>
      <article className={styles.wrap}>
        {skills.map((skill: CategoryType, i: number) => {
          return (
            <Link
              key={i}
              className={styles.link}
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
