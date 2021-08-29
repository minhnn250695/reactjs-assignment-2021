import React, { useEffect, useRef, useState } from "react";
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { addTask, updateTask } from '../../redux-thunk/action/task';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from "react-router-dom";


const TaskDetail = () => {
    const nameRef = useRef(null);
    const [isCreate, setIsCreate] = useState(true);
    const [id, setId] = useState(null);
    const [task, setTask] = useState(null);

    const match = useRouteMatch();
    const tasks = useSelector((state) => state.task.data);    
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let currentTask = tasks?.find(x => x.id === match.params.id);
        setTask(currentTask);
        const { id } = match.params;
        setId(id);
        if (id === 'new') {
            setIsCreate(true);
        } else if (id !== 'new') {
            setIsCreate(false);
        }
    }, [])

    const onSubmitForm = (e) => {
        console.log(e);
        e.preventDefault();
        const data = {
            id: isCreate ? uuidv4() : id,
            taskName: nameRef.current.value,
        };
        if (isCreate) {
            dispatch(addTask(data));
        } else {
            dispatch(updateTask(data));
        }
        history.push('/tasks');
    }

    return (
        <form className="container" onSubmit={() => onSubmitForm}>
            <h3 className="title">{isCreate ? "Create New Task" : "Update Task Info"}</h3>
            <div className="form-group">
                <label style={{ textAlign: 'left', width: '100%' }}>Task Name</label>
                <input type="text" className="form-control" defaultValue={task?.taskName} ref={nameRef} placeholder="User name" />
            </div>
            <div className='d-flex justify-content-end mt-4'>
                <div>
                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </div>
            </div>
        </form>
    );

}
export default TaskDetail;