import compose from './compose';

/**
 * 注册中间件
 * @param  {...any} middlewares 所有的中间件
 */
export default function(...middlewares) {
    return function(createStore) {
        //下面的函数用于创建仓库
        return function(reducer, defaultState) {
            const store = createStore(reducer, defaultState);
            let dispatch = () => {throw new Error('目前还不能使用dispatch')};
            const simpleStore = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args)
            };
            //根据中间件的数组，得到一个dispatch创建函数的数组
            const dispatchProducers = middlewares.map(mid => mid(simpleStore));
            //给dispatch赋值
            dispatch = compose(...dispatchProducers)(store.dispatch);

            return {
                ...store,
                dispatch
            }
        }
    }
}