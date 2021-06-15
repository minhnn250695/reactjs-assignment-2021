import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import './style.scss'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


class MatDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Create new task</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={this.props.selectedColumn} onChange={this.props.handleChangeSelectedColumn}>
                            <FormControlLabel value="td" control={<Radio />} label="TODO" />
                            <FormControlLabel value="ip" control={<Radio />} label="IN PROGRESS" />
                            <FormControlLabel value="de" control={<Radio />} label="DONE" />
                        </RadioGroup>
                    </FormControl>
                    <form className='' noValidate autoComplete="off">
                        <Input placeholder="Enter task name" type='text' inputProps={{ 'aria-label': 'description' }}
                            value={this.props.taskContent}
                            onChange={this.props.handleChangeTaskContent} />
                    </form>

                </DialogContent>
                <DialogActions className="dialog-center">
                    <Button variant="contained" color="primary" onClick={this.props.handleAddNewTask}>Save</Button>
                    <Button variant="contained" onClick={this.props.handleToggleModal}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default MatDialog;