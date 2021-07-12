import axios from "axios";
import constant from '../constant/constant';


export function fetchUsersAPI() {
    return axios.get(constant.getAllUsers);
 }

export function fetchUsersByIdAPI(id) {
   return axios.get(constant.getUserById.replace('{id}', id));
}


export function createUserAPI(user) {
    return axios.post(constant.addUser, user);
}

export function updateUserAPI(user) {
    return axios.put(constant.updateUser.replace('{id}', user.id), user);
}

export function deleteUserAPI(id) {
    return axios.delete(constant.deleteUser.replace('{id}', id));
}
