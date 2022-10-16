import Container from '@components/container'
import Link from 'next/link'
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { setPrevNext, handleKeyDown } from '@utils/pagination'

export default function Pagination({ projects, post }) {
  const [next, setNext] = useState()
  const [previous, setPrevious] = useState()
  const router = useRouter()

  const prevNext = (projects, post) => {
    if (post === undefined) return
    console.log('Useeffect');

    projects?.forEach((project, index) => {
      if (setPrevNext(projects, project, post, index) !== undefined) {
        // console.log('index :', index);
        const { previous, next } = setPrevNext(projects, project, post, index)

        setPrevious(previous)
        setNext(next)
      }
    })
  }

  useEffect(() => {
    // console.log('post :', post);
    prevNext(projects, post)
  }, [post, post._id, projects])

  useEffect(() => {
    // console.log('Post: ', post.title);
    const liam = handleKeyDown.bind(null, previous, next, router)
    document.addEventListener("keydown", liam);

    return () => document.removeEventListener("keydown", liam);
  })

  return (
    <Container>
      <article className="max-w-screen-md mx-auto ">
        <div className="flex justify-center mt-7 mb-7">
          <Link href={`/project/${previous}`}>
            <a className="flex items-center px-4 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
              <ArrowCircleLeftIcon className="w-7 h-7 mr-2" />
              <span className="uppercase">Prev</span>
            </a>
          </Link>
          <Link href={`/project/${next}`}>
            <a className="flex items-center px-4 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
              <span className="uppercase">Next</span>
              <ArrowCircleRightIcon className="w-7 h-7 ml-2" />
            </a>
          </Link>
        </div>
      </article>
    </Container>
  )
}
