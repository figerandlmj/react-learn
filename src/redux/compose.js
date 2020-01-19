/**
 * 函数组合
 * 组合数组中的函数，得到一个新函数
 * 调用新函数时实际上是反向调用数组中的函数
 * @param  {...any} funcs 
 */
export default function compose(...funcs) {
    //如果没有要组合的函数，则返回的函数原封不动的返回参数
    if(funcs.length === 0) {
        return args => args
    }
    //要组合的函数只有一个
    if(funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));

    // return function(...args) {
    //     let lastReturn = null;//记录上一个函数返回的值，它将作为下一个函数的参数
    //     for(let i = funcs.length - 1; i >= 0; i --){
    //         const func = funcs[i];
    //         if(i === funcs.length - 1) {
    //             lastReturn = func(...args);
    //         }else{
    //             lastReturn = func(lastReturn);
    //         }
    //     }
    //     return lastReturn;
    // }
}