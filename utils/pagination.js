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
    console.log('func :', func, wait);

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

    // router.push({
    //     pathname: `/project/${route}`
    // })
}

export const handleKeyDown = (previous, next, router, e) => {
    console.log('handleKeyDown')

    const cb1 = routerPush(router, previous)
    const cb2 = routerPush(router, next)

    if (e.key === 'ArrowLeft') {
        debounce(cb1, 5000)
    } else if (e.key === 'ArrowRight') {
        debounce(cb2, 5000)
        // routerPush(router, next)
    } else {
        return
    }
}