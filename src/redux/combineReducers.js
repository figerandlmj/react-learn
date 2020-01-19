import actionTypes from "./utils/actionTypes"
import isPlainObject from "./utils/isPlainObject"

function validateReducers(reducers) {
    if(!isPlainObject(reducers)){
        throw new TypeError("reducers must be a plain object");
    }
    //验证reducer的返回结果是不是undefined
    for(const key in reducers) {
        if(reducers.hasOwnProperty(key)) {
            const reducer = reducers[key];
            //传递一个特殊的type值
            let state = reducer(undefined, {
                type: actionTypes.INIT()
            });
            if(state === undefined) {
                throw new TypeError("reducers must not return undefined");
            }
            state = reducer(undefined, {
                type: actionTypes.UNKNOWN()
            });
            if(state === undefined) {
                throw new TypeError("reducers must not return undefined");
            }
        }
    }
}

export default function(reducers) {
    //验证reducers
    validateReducers(reducers);

    //返回一个reducer函数
    return function(state = {}, action) {
        const newState = {};
        for(const key in reducers) {
            if(reducers.hasOwnProperty(key)) {
                const reducer = reducers[key];
                newState[key] = reducer(state[key], action);
            }
        }
        return newState;
    }
}