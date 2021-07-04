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
import { deleteTaskAsync } from '../../redux-store/slices/taskSlice';
import { connect } from 'react-redux'

function Tasks(props) {
    const tasks = props.tasks;
    return (
        <>
            <div>
                <h1 className="d-flex justify-content-center user-list" color="dark">Task List</h1>
                <div className="d-flex justify-content-end p-3">
                    <Link to="/tasks/new">
                        <Button variant="contained" color="primary" >Add New Task</Button>
                    </Link>
                </div>
            </div>
            <TableContainer className="" component={Paper}>
                <Table className="" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Task Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ maxWidth: "200px" }} align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.taskName}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/tasks/${row.id}`}>
                                        <Button variant="contained" color="primary">Edit</Button>
                                    </Link>
                                    <Button variant="contained" className="ml-2" color="primary" onClick={() => props.deleteTaskAsync(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

}


const mapStateToProps = () => {
    return (state) => {
        const tasks = state && state.tasks && state.tasks.tasks;
        return { tasks: tasks };
    }
}

const mapDispatch = {
    deleteTaskAsync
}

export default connect(mapStateToProps, mapDispatch)(Tasks);