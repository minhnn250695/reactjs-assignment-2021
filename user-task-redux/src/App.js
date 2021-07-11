import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';
import Users from './pages/users/users';
import UserDetail from './pages/user-detail/user-detail';
import Tasks from './pages/tasks/tasks';
import TaskDetail from './pages/task-detail/task-detail';
import Login from './pages/login/login';
import Logout from './pages/login/logout';

import Spinner from './components/Spinner/spinner';
import { fetchUsersAsync } from './redux-store/slices/usersSlice';
import { fetchTasksAsync } from './redux-store/slices/taskSlice';
import { connect } from 'react-redux';
import { uniqueLoadingSelector } from './redux-store/slices/baseSlice';
import { PrivateRoute } from './route/private-route';
import auth from './auth/authentication';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUsersAsync();
    this.props.fetchTasksAsync();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar className="d-flex justify-content-center" bg="dark" variant="dark">
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Link to="/" style={{ marginRight: '20px' }}>LOGIN</Link>
              <Link to="/tasks" style={{ marginRight: '20px' }}>Tasks</Link>
              <Link to="/users" style={{ marginRight: '20px' }}>Users</Link>
            </Nav>
            <Link to="/logout" className="btn btn-info btn-lg">
              <span className="glyphicon glyphicon-log-out"></span> Log out
            </Link>
          </Navbar>

          <Switch>
            <Route exact path="/" render={props => { return <Login {...props} /> }} ></Route>
            <Route exact path="/logout" render={props => { return <Logout {...props} /> }} ></Route>
            
            <PrivateRoute exact path="/tasks" component={Tasks}></PrivateRoute>
            <PrivateRoute path="/tasks/:id" component={TaskDetail}></PrivateRoute>

            <PrivateRoute exact path="/users" component={Users}></PrivateRoute>
            <PrivateRoute path="/users/:id" component={UserDetail}></PrivateRoute>

            <Route path="*">
              <h1>Page not found!</h1>
            </Route>
          </Switch>
        </Router>

        {this.props.loading ? <Spinner /> : ''}
      </div>
    );
  }

}

const mapState = () => {
  const loadingSelector = uniqueLoadingSelector();
  return (state) => {
    const loading = loadingSelector(state.base);
    return { loading };
  }
}

const mapDispatch = {
  fetchUsersAsync,
  fetchTasksAsync
}

export default connect(mapState, mapDispatch)(App);
