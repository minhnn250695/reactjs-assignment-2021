import React, { Component } from 'react';
import UserDetail from './pages/user-detail/user-detail';
import Users from './pages/users/users';
import TodoList from './pages/to-do-list/todolist';
import Login from './pages/login/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';
class App extends Component {

  render() {

    return (
      <Router>
        <div>
          <Navbar className="d-flex justify-content-center" bg="dark" variant="dark">
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">LOGIN</Nav.Link>
              <Nav.Link href="/todo">TO DO</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/todo">
              <TodoList />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route path="/users/:id">
              <UserDetail />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
