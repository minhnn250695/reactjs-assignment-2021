const API_Url = {
    getAllTask: "/tasks",
    getTaskById: "/tasks/{id}",
    addTask: "/tasks",
    updateTask: "/tasks/{id}",
    deleteTask: "/tasks/{id}",

    getAllUsers: "/users",
    getUserById: "/users/{id}",
    getUserByEmail: "/users?email={email}",
    addUser: "/users",
    updateUser: "/users/{id}",
    deleteUser: "/users/{id}",
};


const Constant = {
    ...API_Url,
    token: 'authentication_token',
    expire_time: 'expire_time',
}


export default Constant;