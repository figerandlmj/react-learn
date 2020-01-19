function createThunkMiddleware(extra) {
    //该函数返回一个中间件
    return store => next => action => {
        if(typeof action === 'function') {
            return action(store.dispatch, store.getState, extra);
        }else{
            return next(action);
        }
    }
}

const thunk = createThunkMiddleware();

thunk.withExtraArgument = createThunkMiddleware;//定义传递第三个参数extra的函数

export default thunk;