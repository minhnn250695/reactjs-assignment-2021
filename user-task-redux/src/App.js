import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';
import Users from './pages/users/users';
import UserDetail from './pages/user-detail/user-detail';
import Tasks from './pages/tasks/tasks';
import TaskDetail from './pages/task-detail/task-detail';
import Login from './pages/login/login';

function App() {
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
        </Navbar>

        <Switch>
          <Route exact path="/tasks">
            <Tasks />
          </Route>
          <Route path="/tasks/:id" render={props => <TaskDetail {...props} />}>
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/users/:id" render={props => <UserDetail {...props} />}>
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
