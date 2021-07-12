import { Component } from "react";
import {logout} from '../../auth/authentication';

class Logout extends Component {
    constructor(props) {
        super(props)
        logout(() => {
            this.props.history.push('/');
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