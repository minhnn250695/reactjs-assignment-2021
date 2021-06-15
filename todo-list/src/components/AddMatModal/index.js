import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import './style.scss'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


const MatDialog = (props) => {
    const handleChange = (event) => {
        console.log(event.target.value);
    };
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Create new task</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                    <RadioGroup aria-label="gender" name="gender1" value={props.selectedColumn} onChange={props.handleChangeSelectedColumn}>
                        <FormControlLabel value="td" control={<Radio />} label="TODO" />
                        <FormControlLabel value="ip" control={<Radio />} label="IN PROGRESS" />
                        <FormControlLabel value="de" control={<Radio />} label="DONE" />
                    </RadioGroup>
                </FormControl>
                <form className='' noValidate autoComplete="off">
                    <Input placeholder="Enter task name" type='text' inputProps={{ 'aria-label': 'description' }}
                        value={props.taskContent}
                        onChange={props.handleChangeTaskContent} />
                </form>

            </DialogContent>
            <DialogActions className="dialog-center">
                <Button variant="contained" color="primary" onClick={props.handleAddNewTask}>Save</Button>
                <Button variant="contained" onClick={props.handleToggleModal}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MatDialog;

// const SimpleDialogDemo = () => {
// //   const [open, setOpen] = React.useState(false);
// //   const [selectedValue, setSelectedValue] = React.useState(emails[0]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   );
// }
// export default SimpleDialogDemo;
