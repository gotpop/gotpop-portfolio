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

export const handleKeyDown = (previous, next, router, e) => {
    if (e.key === 'ArrowLeft') {
        router.push(`/project/${previous}`)
    } else if (e.key === 'ArrowRight') {
        router.push(`/project/${next}`)
    } else {
        return
    }
}
