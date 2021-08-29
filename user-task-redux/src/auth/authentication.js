import Constant from '../constant/constant';
const expireDuration = 60 * 1000 * 10; //sec * milisecon * min

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
        console.log('Authen time', expire_time);
        console.log('Expire duration (ms)', expireDuration);
        console.log('Current time checked', new Date());
        console.groupEnd()
        if (new Date(expire_time).getTime() + expireDuration < new Date().getTime()) {
            console.log('Expired');
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
