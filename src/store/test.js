import store from './index';

// import {change} from './action/student/searchCondition'

// store.dispatch(change({
//     key: 'abc',
//     page: 2
// }));

import {fetchStudents} from './action/student/searchResult'

store.dispatch(fetchStudents());