export default {
    isLogin: false,
    name: '',
    getLoginInfo() {
        let loginInfo = localStorage.getItem('loginInfo');
        if(loginInfo) {
            loginInfo = JSON.parse(loginInfo);
            this.isLogin = loginInfo.isLogin;
            this.name = loginInfo.name;
        }
    },
    login({name, password}) {
        if(name !== 'admin' || password !== '123456') {
            alert('用户名或密码输入错误！');
            return;
        }
        this.isLogin = true;
        this.name = name;
        localStorage.setItem('loginInfo', JSON.stringify({
            isLogin: true,
            name,
        }))
        return true;
    },
    loginOut() {
        this.isLogin = false;
        this.name = '';
        localStorage.removeItem('loginInfo');
    }
}