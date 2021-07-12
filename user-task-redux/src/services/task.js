import axios from "axios";
import constant from '../constant/constant';


export function fetchTasksAPI() {
    return axios.get(constant.getAllTask);
}

export function fetchTasksByIdAPI(id) {
    return axios.get(constant.getTaskById.replace('{id}', id));
}

export function createTaskAPI(task) {
    return axios.post(constant.addTask, task);
}

export function updateTaskAPI(task) {
    return axios.put(constant.updateTask.replace('{id}', task.id), task);
}

export function deleteTaskAPI(id) {
    return axios.delete(constant.deleteTask.replace('{id}', id));
}
