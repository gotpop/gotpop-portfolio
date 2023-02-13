import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline'
import { calculatePrevNext, handleKeyDown } from '@utils/pagination'
import { useEffect, useState } from 'react'

import Container from '@components/container'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Pagination({ projects, post }) {
  const [next, setNext] = useState()
  const [previous, setPrevious] = useState()
  const router = useRouter()

  const loopOver = projects =>
    projects?.forEach((project, index) => setPrevNext(project, index))

  const setPrevNext = (project, index) => {
    if (post._id !== project._id) return

    const { previous, next } = calculatePrevNext(projects, index)

    setPrevious(previous)
    setNext(next)
  }

  useEffect(() => {
    const keyDownBound = handleKeyDown.bind(null, previous, next, router)

    loopOver(projects)
    document.addEventListener("keydown", keyDownBound)

    return () => document.removeEventListener("keydown", keyDownBound)
  })

  return (
    <Container>
      <article className="max-w-screen-md mx-auto ">
        <div className="flex justify-center mt-7 mb-7">
          <Link className="flex items-center px-4 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20" href={`/project/${previous}`}>
              <ArrowCircleLeftIcon className="mr-2 w-7 h-7" />
              <span className="uppercase">Prev</span>
          </Link>
          <Link className="flex items-center px-4 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20" href={`/project/${next}`}>
              <span className="uppercase">Next</span>
              <ArrowCircleRightIcon className="ml-2 w-7 h-7" />
          </Link>
        </div>
      </article>
    </Container>
  )
}
