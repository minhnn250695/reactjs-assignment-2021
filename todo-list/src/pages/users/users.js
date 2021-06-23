import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './style.scss'
import axios from "axios";
import Button from '@material-ui/core/Button';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('/users').then(res => {
            console.log(res);
            this.setState({ users: res.data });
        });
    }

    handleDelete(id) {
        console.log(id);
    }

    render() {
        const { users } = this.state;
        return (
            <>
                <h1 className="d-flex justify-content-center user-list" color="dark">User list</h1>
                <TableContainer className="mt-4" component={Paper}>
                    <Table className="" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="right">User Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow key={row.userId}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.userId}</TableCell>
                                    <TableCell align="right">{row.userName}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={() => this.handleDelete(row.userId)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default Users;