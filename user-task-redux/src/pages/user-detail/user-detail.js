import React, { useRef, useState, useEffect } from "react";
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { addUser, updateUser } from '../../redux-thunk/action/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom'

const UserDetail = () => {
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const phoneRef = useRef(null);

    const [isToggleAssignTask, setToggleAssignTask] = useState(false);
    const [selectValue, setSelectValue] = useState(null);
    const [isCreate, setIsCreate] = useState(false);
    const [user, setUser] = useState(null);
    const [tasksOfUser, setTasksOfUser] = useState([]);

    const match = useRouteMatch();
    const tasks = useSelector((state) => state.task.data);
    const users = useSelector((state) => state.user.data);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const user = users?.find(x => x.id === match.params.id);
        setUser(user);
        const tasksOfUser = user ? user.tasks : [];
        setTasksOfUser(tasksOfUser);
        const { id } = match.params;
        if (id === 'new') {
            setIsCreate(true);
        } else if (id !== 'new') {
            setIsCreate(false);
        }
    }, [])

    const onSubmitForm = (e) => {
        e.preventDefault();
        let newtask = (user && user.tasks) ? [...user.tasks] : [];
        if (selectValue !== '') {
            newtask.push(selectValue);
        }
        const data = {
            id: isCreate ? uuidv4() : match.params.id,
            userName: nameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
            tasks: newtask
        };
        if (isCreate) {
            dispatch(addUser(data));
        } else {
            dispatch(updateUser(data));
        }
        history.push('/users');
    }

    const toogleAssignTask = () => {
        const isToogle = !isToggleAssignTask;
        setToggleAssignTask(isToogle);
    }

    const handleChange = (e) => {
        setSelectValue(e.target.value);
    }

    return (
        <>
            <form className="container" onSubmit={() => onSubmitForm}>
                <h3 className="title">{isCreate ? "Create New User" : "Update User Info"}</h3>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>User Name</label>
                    <input type="text" className="form-control" defaultValue={user?.userName} ref={nameRef} placeholder="User name" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Address</label>
                    <input type="text" className="form-control" defaultValue={user?.address} ref={addressRef} placeholder="Address" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Email address</label>
                    <input type="text" className="form-control" defaultValue={user?.email} ref={emailRef} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Password</label>
                    <input type="password" className="form-control" defaultValue={user?.password} ref={passRef} placeholder="Password" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Phone</label>
                    <input type="text" maxLength="10" className="form-control" defaultValue={user?.phone} ref={phoneRef} placeholder="Enter phone number" />
                </div>
                {tasksOfUser && tasksOfUser.length > 0 &&
                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Tasks</label>
                        {tasksOfUser.map((task) => {
                            return <span key={task.id} style={{ width: '15%' }} className="form-control">{task.taskName} </span>
                        })}
                    </div>
                }
                <div className='d-flex justify-content-end mt-4'>
                    <div>
                        <button type="button" className="btn btn-primary btn-block m-2" onClick={() => toogleAssignTask} >Assign Task</button>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block m-2">Save</button>
                    </div>
                </div>

                {isToggleAssignTask &&
                    <div className="form-group">
                        <label style={{ marginRight: '8px' }}>Select Task</label>
                        <select style={{ textAlign: 'left', width: '20%' }} value={selectValue} onChange={() => handleChange}>
                            <option>Default Value</option>
                            {tasks.map((t) => {
                                return <option key={t.id} value={t.id}>{t.taskName}</option>
                            })}
                        </select>
                    </div>
                }
            </form>
        </>
    )
}

export default UserDetail;