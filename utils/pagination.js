import debounce from '@utils/debounce'

export const setPrevNext = (projects, project, post, index) => {
    if (post._id !== project._id) return

    const end = projects.length - 1
    let positionPrev
    let positionNext

    index === 0 ? positionPrev = end : positionPrev = index - 1
    index === end ? positionNext = 0 : positionNext = index + 1

    const previous = projects[positionPrev].slug.current
    const next = projects[positionNext].slug.current

    return {
        previous,
        next
    }
}

export const routerPush = (router, route) => {
    if (route === undefined) return

    router.push({
        pathname: `/project/${route}`
    })
}

export const handleKeyDown = (previous, next, router, e) => {
    if (e.key === 'ArrowLeft') {
        debounce(routerPush(router, previous), 1000, true)
    } else if (e.key === 'ArrowRight') {
        debounce(routerPush(router, next), 1000)
    } else {
        return
    }
}