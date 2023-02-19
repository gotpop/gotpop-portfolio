'use client'

import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { calculatePrevNext, handleKeyDown } from '@utils/pagination'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { ProjectType } from '@lib/sanity.types'
import styles from './Pagination.module.css'
import { useRouter } from 'next/navigation'

type Props = {
  projects: ProjectType[]
  post: ProjectType
}

export default function Pagination({ projects, post }: Props) {
  const [next, setNext] = useState<string>()
  const [previous, setPrevious] = useState<string>()
  const router = useRouter()

  const loopOver = (projects: ProjectType[]) =>
    projects?.forEach((project, index) => setPrevNext(project, index))

  const setPrevNext = (project: ProjectType, index: number) => {
    if (post.slug.current !== project.slug.current) return

    const { previous, next } = calculatePrevNext(projects, index)

    setPrevious(previous)
    setNext(next)
  }

  useEffect(() => {
    const keyDownBound = handleKeyDown(previous, next, router)

    loopOver(projects)
    document.addEventListener('keydown', keyDownBound)

    return () => document.removeEventListener('keydown', keyDownBound)
  })

  return (
    <>
      <article className={styles.wrap}>
        <div className={styles.pagination}>
          <Link className={styles.link} href={`/projects/${previous}`}>
            <GrLinkPrevious />
            <span className="uppercase">Prev</span>
          </Link>
          <Link className={styles.link} href={`/projects/${next}`}>
            <span className="uppercase">Next</span>
            <GrLinkNext />
          </Link>
        </div>
      </article>
    </>
  )
}
