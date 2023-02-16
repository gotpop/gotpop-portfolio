export const calculatePrevNext = (projects: string | any[], index: number) => {
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

export const handleKeyDown = (previous: any, next: any, router: string[], e: { key: string }) => {
    return e.key === 'ArrowLeft' ? router.push(`/projects/${previous}`)
        : e.key === 'ArrowRight' ? router.push(`/projects/${next}`)
            : null
}
