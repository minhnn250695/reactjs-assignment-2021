import { Component } from "react";
import auth from '../../auth/authentication';

class Logout extends Component {
    constructor(props) {
        super(props)
        auth.logout(() => {
            auth.logout(() => {
                this.props.history.push('/');
            })
        })
    }

    render() {
        return (
            <>
            </>
        )
    }
}

export default Logout;