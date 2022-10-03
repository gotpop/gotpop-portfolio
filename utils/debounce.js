// const debounce = (func, wait, immediate) => {
//     let timeout

//     return function () {
//         const context = this
//         const args = arguments;

//         console.log('arguments :', arguments, args);

//         const later = function () {
//             timeout = null
//             if (!immediate) func.apply(context, args)
//         }

//         const callNow = immediate && !timeout

//         clearTimeout(timeout)
//         timeout = setTimeout(later, wait)

//         if (callNow) func.apply(context, args)
//     }
// }

// function debounce(func, wait) {
//     console.log('func :', func, wait);

//     let timeout;
//     return function () {
//         const context = this;
//         const args = arguments;

//         console.log('args :', args);

//         const later = function () {
//             timeout = null;
//             func.apply(context, args);
//         };
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//     };
// };

// export default debounce