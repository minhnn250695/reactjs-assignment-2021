import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { PrivateRoute } from './routes/private-route';
import SignUp from './pages/sign-up/sign-up';

const App = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isExpired = useSelector((state) => state.loading.isExpired);
  
  return (
    <>
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
            <Route exact path="/signup" render={props => { return <SignUp {...props} /> }} ></Route>

            <Route exact path="/logout" render={props => { return <Logout {...props} /> }} ></Route>

            <PrivateRoute exact path="/tasks" component={Tasks}></PrivateRoute>
            <PrivateRoute path="/tasks/:id" component={TaskDetail}></PrivateRoute>

            <PrivateRoute exact path="/users" component={Users}></PrivateRoute>
            <PrivateRoute path="/users/:id" component={UserDetail}></PrivateRoute>

            <Route path="*">
              <h1>Page not found!</h1>
            </Route>
          </Switch>
          {isExpired ? <Redirect to='/' /> : ''}
        </Router>

        {isLoading ? <Spinner /> : ''}
      </div>
    </>
  )

}
export default App;
