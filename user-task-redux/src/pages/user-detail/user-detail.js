import React, { Component, createRef } from "react";
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import { addUserAsync, deleteUserAsync, updateUserAsync } from '../../redux-store/slices/usersSlice';
import { addTaskAsync, deleteTaskAsync, updateTaskAsync } from '../../redux-store/slices/taskSlice';

class UserDetail extends Component {
    nameRef;
    addressRef;
    emailRef;
    phoneRef;
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isToggleAssignTask: false,
            selectValue: ''
        }
        this.nameRef = createRef();
        this.addressRef = createRef();
        this.emailRef = createRef();
        this.phoneRef = createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id === 'new') {
            this.setState({ isCreate: true })
        } else if (id !== 'new') {
            this.setState({ isCreate: false });
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let newtask = (this.props.user && this.props.user.tasks) ? [...this.props.user.tasks] : [];
        if (this.state.selectValue !== '') {
            newtask.push(this.state.selectValue);
        }
        const data = {
            id: this.state?.isCreate ? uuidv4() : this.props?.user.id,
            userName: this.nameRef.current.value,
            email: this.emailRef.current.value,
            address: this.addressRef.current.value,
            phone: this.phoneRef.current.value,
            tasks: newtask
        };
        if (this.state?.isCreate) {
            this.props.addUserAsync(data);
        } else {
            this.props.updateUserAsync(data);
        }
        this.props.history.push('/users');
    }

    toogleAssignTask = () => {
        const isToogle = !this.state.isToggleAssignTask;
        this.setState({ isToggleAssignTask: isToogle });
    }

    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }

    render() {
        return (
            <form className="container" onSubmit={this.onSubmitForm}>
                <h3 className="title">{this.props.isCreate ? "Create New User" : "Update User Info"}</h3>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>User Name</label>
                    <input type="text" className="form-control" defaultValue={this.props.user?.userName} ref={this.nameRef} placeholder="User name" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Address</label>
                    <input type="text" className="form-control" defaultValue={this.props.user?.address} ref={this.addressRef} placeholder="Address" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Email address</label>
                    <input type="text" className="form-control" defaultValue={this.props.user?.email} ref={this.emailRef} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Phone</label>
                    <input type="text" maxLength="10" className="form-control" defaultValue={this.props.user?.phone} ref={this.phoneRef} placeholder="Enter phone number" />
                </div>
                {this.props.tasks && this.props.tasks.length > 0 &&
                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Tasks</label>
                        {this.props.tasks.map((task) => {
                            return <span key={task.id} style={{ width: '15%' }} className="form-control">{task.taskName} </span>
                        })}
                    </div>
                }
                <div className='d-flex justify-content-end mt-4'>
                    <button type="button" className="btn btn-primary btn-block m-2" onClick={() => { this.toogleAssignTask() }} >Assign Task</button>
                    <button type="submit" className="btn btn-primary btn-block m-2">Save</button>
                </div>

                {this.state.isToggleAssignTask &&
                    <div className="form-group">
                        <label style={{ marginRight: '8px' }}>Select Task</label>
                        <select style={{ textAlign: 'left', width: '20%' }} value={this.state.selectValue} onChange={this.handleChange}>
                            <option>Default Value</option>
                            {this.props.allTask.map((t) => {
                                return <option key={t.id} value={t.id}>{t.taskName}</option>
                            })}
                        </select>
                    </div>
                }
            </form>
        );
    }
}

const getCurrentUserDetail = (users, id) => {
    return users.filter(us => us.id == id)[0];
}

const getListTaskByUserId = (alltask, user) => {
    if (!user || !user.tasks || user.tasks.length == 0) return [];
    const assignedTasks = user.tasks;
    let newList = alltask.filter(all => {
        return assignedTasks.includes(all.id);
    });
    return newList;
}

const mapStateToProps = () => {
    return (state, ownProps) => {
        const allTask = state.tasks && state.tasks.tasks;
        const user = getCurrentUserDetail(state.users.users, ownProps.match.params.id);
        const tasks = getListTaskByUserId(state.tasks.tasks, user);
        return { tasks, user, allTask };
    }
}

const mapDispatch = {
    deleteUserAsync,
    addUserAsync,
    updateUserAsync,
    addTaskAsync,
    updateTaskAsync,
    deleteTaskAsync,
}
export default connect(mapStateToProps, mapDispatch)(UserDetail);