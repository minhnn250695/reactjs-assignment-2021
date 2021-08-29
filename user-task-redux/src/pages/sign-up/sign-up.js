import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../../redux-thunk/action/user';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'


const SignUp = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            id: uuidv4(),
            userName: nameRef.current.value,
            password: passRef.current.value,
            email: emailRef.current.value,
        };
        dispatch(addUser(data));
        history.push('/');
    }
    return (
        <>
            <form className="container" onSubmit={() => onSubmitForm}>
                <h3 className="title">Create New User</h3>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>User Name</label>
                    <input type="text" className="form-control" ref={nameRef} placeholder="User name" />
                </div>
                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Email address</label>
                    <input type="text" className="form-control" ref={emailRef} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label style={{ textAlign: 'left', width: '100%' }}>Password</label>
                    <input type="password" className="form-control" ref={passRef} placeholder="Password" />
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

export default SignUp;