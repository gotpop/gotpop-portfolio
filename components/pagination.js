import Container from "@components/container";
import Link from "next/link";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Pagination({ projects, post }) {
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const router = useRouter();

  const setPrevNext = (project, index) => {
    if (post._id !== project._id) return

    const end = projects.length - 1
    let positionPrev
    let positionNext

    index === 0 ? positionPrev = end : positionPrev = index - 1
    index === end ? positionNext = 0 : positionNext = index + 1

    const previous = projects[positionPrev].slug.current
    const next = projects[positionNext].slug.current

    setPrevious(previous)
    setNext(next)
  }

  const prevNext = (projects, post) => {
    if (post === undefined) return

    projects?.forEach((project, index) => setPrevNext(project, index))
  }

  useEffect(() => {
    prevNext(projects, post)
  })

  const routerPush = route => {
    if (route === undefined) return

    router.push({
      pathname: `/project/${route}`
    })
  }

  const handleKeyDown = (previous, next, e) => {
    if (e.key !== 'ArrowLeft') {
      routerPush(previous)
    } else if (e.key !== 'ArrowRight') {
      routerPush(next)
    } else {
      return
    }
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  useEffect(() => {
    const debouncedCb = debounce(handleKeyDown.bind(null, previous, next), 500);
    
    document.addEventListener("keydown", debouncedCb);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [previous]);

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
  );
}
