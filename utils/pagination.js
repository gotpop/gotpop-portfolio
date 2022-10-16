// import debounce from '@utils/debounce'

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

function debounce(func, wait) {
    // console.log('func :', func, wait);

    let timeout;
    return function () {
        const context = this;
        const args = arguments;

        console.log('args :', args);

        const later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


export function routerPush(router, route) {
    if (route === undefined) return

    console.log('routerPush :', route);

    router.push(`/project/${route}`)

    // router.push({
    //     pathname: `/project/${route}`
    // })
}

export const handleKeyDown = (previous, next, router, e) => {
    // console.log('handleKeyDown')

    // const cb1 = routerPush(router, previous)
    // const cb2 = routerPush(router, next)

    if (e.key === 'ArrowLeft') {
        router.push(`/project/${previous}`)
    } else if (e.key === 'ArrowRight') {
        router.push(`/project/${next}`)
    } else {
        return
    }
}