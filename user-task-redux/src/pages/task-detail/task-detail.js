import React, { Component, createRef } from "react";
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import { addTaskAsync, updateTaskAsync } from '../../redux-store/slices/taskSlice';
class TaskDetail extends Component {
    nameRef;
    addressRef;
    emailRef;
    phoneRef;
    constructor(props) {
        super(props);
        this.state = {
            isCreate: true,
        }
        this.nameRef = createRef();
        this.addressRef = createRef();
        this.emailRef = createRef();
        this.phoneRef = createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
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
            id: this.state?.isCreate ? uuidv4() : this.props?.task.id,
            taskName: this.nameRef.current.value,
        };
        if (this.state?.isCreate) {
            this.props.addTaskAsync(data);
        } else {
            this.props.updateTaskAsync(data);

        }
        this.props.history.push('/tasks');
    }

    render() {
        return (
            <form className="container" onSubmit={this.onSubmitForm}>
                <h3 className="title">{this.state.isCreate ? "Create New Task" : "Update Task Info"}</h3>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Task Name</label>
                    <input type="text" className="form-control" defaultValue={this.props.task?.taskName} ref={this.nameRef} placeholder="User name" />
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </div>
            </form>
        );
    }
}

const getCurrentTaskDetail = (tasks, id) => {
    return tasks.filter(task => task.id == id)[0];
}

const mapStateToProps = () => {
    return (state, ownProps) => {
        const task = getCurrentTaskDetail(state.tasks.tasks, ownProps.match.params.id);
        return { task };
    }
}

const mapDispatch = {
    updateTaskAsync,
    addTaskAsync,
}
export default connect(mapStateToProps, mapDispatch)(TaskDetail);