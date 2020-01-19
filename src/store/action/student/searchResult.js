import {searchStudents} from '../../../services/student';

export const actionTypes = {
    setStudentsAndTotal: Symbol('setStudentsAndTotal'),
    setIsLoading: Symbol('setIsLoading')
}

export function setStudentsAndTotal(arr, total) {
    return {
        type: actionTypes.setStudentsAndTotal,
        payload: {
            datas: arr,
            total
        }
    }
}

export function setIsLoading(isLoading) {
    return {
        type: actionTypes.setIsLoading,
        payload: isLoading
    }
}

export function fetchStudents() {
    return async function(dispatch, getState) {
        dispatch(setIsLoading(true));
        const condition = getState().student.condition;
        const resp = await searchStudents(condition);
        dispatch(setStudentsAndTotal(resp.datas, resp.cont));
        dispatch(setIsLoading(false));
    }
}