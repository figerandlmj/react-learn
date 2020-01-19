export default function(actionCreators, dispatch) {
    if(typeof actionCreators === 'function') {
        return getAutoDispatchActionCreators(actionCreators, dispatch);
    }else if(typeof actionCreators === 'object') {
        const result = {};
        for(const key in actionCreators) {
            if(actionCreators.hasOwnProperty(key)) {
                const actionCreator = actionCreators[key];
                if(typeof actionCreator === 'function') {
                    result[key] = getAutoDispatchActionCreators(actionCreator, dispatch);
                }
            }
        }
        return result;
    }else{
        throw new TypeError('actionCreators must be an object or function which means action creator');
    }
}

function getAutoDispatchActionCreators(actionCreator, dispatch) {
    return function(...args) {
        const action = actionCreator(...args);
        dispatch(action);
    }
}