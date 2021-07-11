import { Component } from 'react';
import Constant from '../constant/constant';

class Authentication extends Component {
    constructor(props) {
        super(props);
    }

    login(callback) {
        localStorage.setItem(Constant.token, 'abcd');
        callback();
    }

    logout = (callback) => {
        localStorage.removeItem(Constant.token);
        callback();
    }

    isAuthenticated = () => {
        return localStorage.getItem(Constant.token) ? true : false;
    }
}

export default new Authentication();