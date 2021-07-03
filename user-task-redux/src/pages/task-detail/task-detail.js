import axios from "axios";
import React, { Component, createRef } from "react";
import './style.scss';
import { v4 as uuidv4 } from 'uuid';

class TaskDetail extends Component {
    nameRef;
    addressRef;
    emailRef;
    phoneRef;
    constructor(props) {
        super(props);
        this.state = {
            isCreate: true,
            user: null
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
            axios.get('/users/{id}'.replace('{id}', id)).then(gotUser => {                
                this.setState({
                    isCreate: false,
                    user: gotUser.data,
                });
            });
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            id: this.state?.isCreate ? uuidv4() : this.state?.user.id,
            userName: this.nameRef.current.value,
        };
        if (this.state?.isCreate) {
            axios.post('/users', data).then(created => {
            });
        } else {
            const { id } = this.props.match.params;
            axios.put('/users/{id}'.replace('{id}', id), data).then(updated => {
            });
        }
        this.props.history.push('/users');
    }

    render() {
        return (
            <form className="container" onSubmit={this.onSubmitForm}>
                <h3 className="title">{this.state.isCreate ? "Create New Task" : "Update Task Info"}</h3>
                <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" className="form-control" defaultValue={this.state.user?.userName} ref={this.nameRef} placeholder="User name" />
                </div>               
                <div className='d-flex justify-content-end mt-4'>
                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </div>
            </form>
        );
    }
}
export default TaskDetail;