import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './style.scss'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import { getUsers, deleteUser } from '../../redux-thunk/action/user';
import { getTasks } from '../../redux-thunk/action/task';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.data);
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getTasks());
    }, [])

    const deleteUserOnclick = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <>
            <div>
                <h1 className="d-flex justify-content-center user-list" color="dark">User List</h1>
                <div className="d-flex justify-content-end p-3">
                    <Link to="/users/new">
                        <Button variant="contained" color="primary" >Add New User</Button>
                    </Link>
                </div>
            </div>
            <TableContainer className="" component={Paper}>
                <Table className="" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">User Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ maxWidth: "200px" }} align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.userName}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/users/${row.id}`}>
                                        <Button variant="contained" color="primary">Edit</Button>
                                    </Link>
                                    <Button variant="contained" className="ml-2" color="primary" onClick={() => deleteUserOnclick(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Users;