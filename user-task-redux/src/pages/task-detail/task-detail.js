import React, { Component, createRef } from "react";
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import  ActionTypes  from "../../redux/action/actionTypes";

const getCurrentTaskDetail = (tasks, id) => {
    return tasks.filter(task => task.id === id)[0];
}

class TaskDetail extends Component {
    nameRef;
    addressRef;
    emailRef;
    phoneRef;
    constructor(props) {
        super(props);
        this.state = {
            isCreate: true,
            task: {}
        }
        this.nameRef = createRef();
        this.addressRef = createRef();
        this.emailRef = createRef();
        this.phoneRef = createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const selectedTask = getCurrentTaskDetail(this.props.tasks, id);
        this.setState({ task: selectedTask, id: id });

        if (id === 'new') {
            this.setState({
                isCreate: true,
            })
        } else if (id !== 'new') {
            this.setState({
                isCreate: false,
            });
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            id: this.state?.isCreate ? uuidv4() : this.state.id,
            taskName: this.nameRef.current.value,
        };
        if (this.state?.isCreate) {
            this.props.createTask(data);
        } else {
            this.props.updateTask(data);

        }
        this.props.history.push('/tasks');
    }

    render() {
        return (
            <form className="container" onSubmit={this.onSubmitForm}>
                <h3 className="title">{this.state.isCreate ? "Create New Task" : "Update Task Info"}</h3>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Task Name</label>
                    <input type="text" className="form-control" defaultValue={this.state.task?.taskName} ref={this.nameRef} placeholder="User name" />
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block">Save</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return (state) => {
        const tasks = state && state.taskReducer;
        return { tasks };
    }
}

const mapDispatchToProps = {
    createTask: (task) => ({ type: ActionTypes.ADD_TASK, payload: task }),
    updateTask: (task) => ({ type: ActionTypes.UPDATE_TASK, payload: task }),
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);