import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class AddAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, assignments:{}};
    };

    handleClickOpen = () => {
        this.setState( {open:true} );
    };

    handleClose = () => {
        this.setState( {open:false} );
    };

    handleChange = (event) => {
        this.setState( { assignments:{[event.target.name]: event.target.value} });
    }

    handleAdd = () => {
        this.props.addAssignment(this.state.assignments);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" style={{margin: 10}}
                    onClick={this.handleClickOpen}>
                    Add Assignment
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add Assignment</DialogTitle>
                    <DialogContent style={{paddingTop: 20}} >
                        <TextField autoFocus fullWidth label="Assignment Name"
                            name="assignment_name" onChange={this.handleChange} />
                        <br/><br/>
                        <TextField autoFocus fullWidth label="Course ID"
                            name="course_id" onChange={this.handleChange} />
                        <br/><br/>
                        <TextField autoFocus fullWidth label="Due Date"
                            name="due_date" onChange={this.handleChange} />

                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleClose}>
                            CANCEL
                        </Button>
                        <Button id="Add" color="primary" onClick={this.handleAdd}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

AddAssignment.propTypes = {
    addAssignment: PropTypes.func.isRequired
}

export default AddAssignment;
