import actionTypes from "./utils/actionTypes"
import isPlainObject from "./utils/isPlainObject"

export default function createStore(reducer, defaultState, enhanced) {
    //enhanced表示applyMidddleware返回的函数
    if(typeof defaultState === 'function') {
        //第二个参数是应用中间件的函数返回值
        enhanced = defaultState;
        defaultState = undefined;
    }
    if(typeof enhanced === 'function') {
        //进入applyMiddleware的处理逻辑
        return enhanced(createStore)(reducer, defaultState);
    }

    let curReducer = reducer,//当前使用的reducer
        curState = defaultState;//当前仓库中的状态

    const listeners = [];//记录所有的监听器（订阅者）

    //action分发函数
    function dispatch(action) {
        //验证action
        if(!isPlainObject(action)) {
            throw new TypeError('action must be a plain object');
        }
        //验证action的type属性是否存在
        if(action.type === undefined) {
            throw new TypeError('action must has s property of type');
        }
        curState = curReducer(curState, action);

        //运行所有的订阅者
        for(const listener of listeners) {
            listener();
        }
    }

    //获取状态函数
    function getState() {
        return curState;
    }

    //监听器函数（订阅器）
    function subscribe(listener) {
        listeners.push(listener);//将监听器加入到数组中
        let isRemove = false;//是否已经移除
        //返回一个取消监听的函数
        return function() {
            if(isRemove) {
                return;
            }
            //将listener从数组中移除
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
            isRemove = true;
        }
    }

    //创建仓库时，需要分发一次初始的action
    dispatch({
        type: actionTypes.INIT()
    });

    return {
        dispatch,
        getState,
        subscribe
    };
}