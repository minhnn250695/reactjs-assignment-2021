import React, { Component, createRef } from "react";
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import ActionTypes from "../../redux/action/actionTypes";

const getCurrentUserDetail = (users, id) => {
    return users.filter(us => us.id === id)[0];
}

const getListTaskByUserId = (alltask, user) => {
    if (!user || !user.tasks || user.tasks.length === 0) return [];
    const assignedTasks = user.tasks;
    let newList = alltask.filter(all => {
        return assignedTasks.includes(all.id);
    });
    return newList;
}

class UserDetail extends Component {
    nameRef;
    addressRef;
    emailRef;
    passRef;
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
        this.passRef = createRef();
        this.phoneRef = createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        const user = getCurrentUserDetail(this.props.users, this.props.match.params.id);
        const tasksOfUser = getListTaskByUserId(this.props.tasks, user);

        this.setState({ user, id, tasksOfUser: tasksOfUser })
        if (id === 'new') {
            this.setState({ isCreate: true })
        } else if (id !== 'new') {
            this.setState({ isCreate: false });
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let newtask = (this.state.user && this.state.user.tasks) ? [...this.state.user.tasks] : [];
        if (this.state.selectValue !== '') {
            newtask.push(this.state.selectValue);
        }
        const data = {
            id: this.state?.isCreate ? uuidv4() : this.state.id,
            userName: this.nameRef.current.value,
            password: this.passRef.current.value,
            email: this.emailRef.current.value,
            address: this.addressRef.current.value,
            phone: this.phoneRef.current.value,
            tasks: newtask
        };
        if (this.state?.isCreate) {
            this.props.createUser(data);
        } else {
            this.props.updateUser(data);
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
                <h3 className="title">{this.state.isCreate ? "Create New User" : "Update User Info"}</h3>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>User Name</label>
                    <input type="text" className="form-control" defaultValue={this.state.user?.userName} ref={this.nameRef} placeholder="User name" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Address</label>
                    <input type="text" className="form-control" defaultValue={this.stateuser?.address} ref={this.addressRef} placeholder="Address" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Email address</label>
                    <input type="text" className="form-control" defaultValue={this.state.user?.email} ref={this.emailRef} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Password</label>
                    <input type="password" className="form-control" defaultValue={this.state.user?.pass} ref={this.passRef} placeholder="Password" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Phone</label>
                    <input type="text" maxLength="10" className="form-control" defaultValue={this.state.user?.phone} ref={this.phoneRef} placeholder="Enter phone number" />
                </div>
                {this.state.tasksOfUser && this.state.tasksOfUser.length > 0 &&
                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Tasks</label>
                        {this.state.tasksOfUser.map((task) => {
                            return <span key={task.id} style={{ width: '15%' }} className="form-control">{task.taskName} </span>
                        })}
                    </div>
                }
                <div className='d-flex justify-content-end mt-4'>
                    <div>
                        <button type="button" className="btn btn-primary btn-block m-2" onClick={() => { this.toogleAssignTask() }} >Assign Task</button>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block m-2">Save</button>
                    </div>
                </div>

                {this.state.isToggleAssignTask &&
                    <div className="form-group">
                        <label style={{ marginRight: '8px' }}>Select Task</label>
                        <select style={{ textAlign: 'left', width: '20%' }} value={this.state.selectValue} onChange={this.handleChange}>
                            <option>Default Value</option>
                            {this.props.tasks.map((t) => {
                                return <option key={t.id} value={t.id}>{t.taskName}</option>
                            })}
                        </select>
                    </div>
                }
            </form>
        );
    }
}



const mapStateToProps = () => {
    return (state) => {
        const tasks = state && state.taskReducer;
        const users = state && state.userReducer;
        return { tasks, users };
    }
}

const mapDispatchToProps = {
    createUser: (user) => ({ type: ActionTypes.ADD_USER, payload: user }),
    updateUser: (user) => ({ type: ActionTypes.UPDATE_USER, payload: user }),
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);