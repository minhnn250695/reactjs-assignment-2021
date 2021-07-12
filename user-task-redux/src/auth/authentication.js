import Constant from '../constant/constant';
const expireDuration = 60 * 1000 * 1;

export function setAuthenticationLocalStorage(token, expire) {
    localStorage.setItem(Constant.token, token);
    localStorage.setItem(Constant.expire_time, expire);
}

export function removeAuthenticationLocalStorage() {
    localStorage.removeItem(Constant.token);
    localStorage.removeItem(Constant.expire_time);
}

export function isExpiredToken() {
    return new Promise((resolve, reject) => {
        const expire_time = localStorage.getItem(Constant.expire_time);
        console.group('Expire check')
        console.log('expire_time', expire_time);
        console.log('expireDuration', expireDuration);
        console.log('new Date()', new Date());
        console.groupEnd()
        if (new Date(expire_time).getTime() + expireDuration < new Date().getTime()) {
            removeAuthenticationLocalStorage();
            resolve(true);
        }
        resolve(false);
    }).then(res => res)
}

export const isAuthenticated = () => {
    return localStorage.getItem(Constant.token) ? true : false;
}

export function logout(callback) {
    removeAuthenticationLocalStorage();
    callback();
}
