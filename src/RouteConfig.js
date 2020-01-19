let RouteConfig = {
    login: '/login',
    admin: {
        root: '/',
        students: {
            root: 'students',
            add: '/add'
        },
        courses: {
            root: 'courses',
            add: '/add'
        }
    }
}

/**
 * 将对象obj的每个属性前面添加上baseUrl
 * @param {*} obj 
 * @param {*} baseUrl 
 */
function setConfig(obj, baseUrl) {
    const newBaseUrl = baseUrl + (obj['root'] ? obj['root'] : '');
    for(let prop in obj) {
        const value = obj[prop];
        if(typeof value === 'string') {
            if(prop === 'root') {
                obj[prop] = newBaseUrl;
            }else{
                obj[prop] = newBaseUrl + value;
            }
        }else{
            setConfig(value, newBaseUrl);
        }
    }
}

setConfig(RouteConfig, '');

export default RouteConfig;