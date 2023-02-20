'use client'

import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import { calculatePrevNext, handleKeyDown } from '@utils/pagination'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { ProjectType } from '@lib/sanity.types'
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
      <article className="pagination__wrap">
        <div className="pagination">
          <Link className="pagination__link" href={`/projects/${previous}`}>
            <GrLinkPrevious />
            <span className="uppercase">Prev</span>
          </Link>
          <Link className="pagination__link" href={`/projects/${next}`}>
            <span className="uppercase">Next</span>
            <GrLinkNext />
          </Link>
        </div>
      </article>
    </>
  )
}
