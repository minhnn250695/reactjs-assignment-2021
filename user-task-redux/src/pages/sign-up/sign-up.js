import { Component, createRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import ActionTypes from "../../redux/action/actionTypes";

class SignUp extends Component {
    nameRef;
    emailRef;
    passRef;
    constructor(props) {
        super(props);
        this.nameRef = createRef();
        this.emailRef = createRef();
        this.passRef = createRef();
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            id: uuidv4(),
            userName: this.nameRef.current.value,
            password: this.passRef.current.value,
            email: this.emailRef.current.value,
        };
        this.props.createUser(data);
        this.props.history.push('/');
    }
    render() {
        return (
            <>
                <form className="container" onSubmit={this.onSubmitForm}>
                    <h3 className="title">Create New User</h3>
                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>User Name</label>
                        <input type="text" className="form-control" ref={this.nameRef} placeholder="User name" />
                    </div>
                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Email address</label>
                        <input type="text" className="form-control" ref={this.emailRef} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label style={{ textAlign: 'left', width: '100%' }}>Password</label>
                        <input type="password" className="form-control" ref={this.passRef} placeholder="Password" />
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                        <div>
                            <button type="submit" className="btn btn-primary btn-block m-2">Sign Up</button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

// const mapStateToProps = () => {
//     return (state) => {
//         const tasks = state && state.taskReducer;
//         const users = state && state.userReducer;
//         return { tasks, users };
//     }
// }

const mapDispatchToProps = {
    createUser: (user) => ({ type: ActionTypes.ADD_USER, payload: user })
}
export default connect(null, mapDispatchToProps)(SignUp);