import axios from "axios";
import constant from '../constant/constant';
import { removeAuthenticationLocalStorage, setAuthenticationLocalStorage } from '../auth/authentication'

export async function signUp(userName, email, password) {
    const body = {
        userName, email, password
    }
    const register = await axios.post(constant.addUser, body);
    return register;
}

export async function signIn(email, password) {
    const login = await axios.get(constant.getUserByEmail.replace('{email}', email));
    if (login.data && login.data[0] && password === login.data[0].password) {
        const token = 'Bear Hjjasdk aksdnkasndiawyerwrn wfnwja 7882db dasdi88cvn';
        const expire = new Date();
        setAuthenticationLocalStorage(token, expire);
        return true;
    }
    removeAuthenticationLocalStorage();
    return false;

}
