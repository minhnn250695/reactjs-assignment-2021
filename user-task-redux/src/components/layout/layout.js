import { Component } from 'react'
import ActionTypes from '../../redux/action/actionTypes';
import { connect } from 'react-redux'

class Layout extends Component {
    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchTasks();
    }

    render() {
        return (
            <>
                <div className='container'></div>
            </>
        );
    }
}

const mapStateToProps = () => {
    return (state) => {
        return { state };
    }
}

const mapDispatchToProps = {
    fetchUsers: () => ({ type: ActionTypes.FETCH_USERS_DATA }),
    fetchTasks: () => ({ type: ActionTypes.FETCH_TASKS_DATA }),
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);