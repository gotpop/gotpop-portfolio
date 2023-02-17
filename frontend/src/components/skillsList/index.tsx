import Link from "next/link"
import styles from "./skillsList.module.css"

type Props = {
  skills: any
}

export default function SkillsList({ skills }: Props) {
  return (
    <>
      <article className={styles.wrap}>
        {skills.map((skill: any, i: number) => {
          return (
            <Link key={i} className={styles.link} href={`/skills/${skill.slug.current}`}>
              {skill.title}
            </Link>
          )
        })}
      </article>
    </>
  )
}
