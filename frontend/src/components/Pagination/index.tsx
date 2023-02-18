'use client'

import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { calculatePrevNext, handleKeyDown } from '@utils/pagination'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import styles from './Pagination.module.css'
import { useRouter } from 'next/navigation'

type Props = {
  projects: any
  post: any
}

export default function Pagination({ projects, post }: Props) {
  const [next, setNext] = useState()
  const [previous, setPrevious] = useState()
  const router = useRouter()

  const loopOver = (projects: any[]) =>
    projects?.forEach((project, index) => setPrevNext(project, index))

  const setPrevNext = (project: { _id: any }, index: number) => {
    if (post._id !== project._id) return

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
