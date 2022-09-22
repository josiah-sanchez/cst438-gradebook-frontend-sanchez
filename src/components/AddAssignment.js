import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants.js'

class AddAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false,
                        assignmentName: '', courseId: '', dueDate: ''};
    };

    handleClickOpen = () => {
        this.setState( {open:true} );
    };

    handleClose = () => {
        this.setState( {open:false} );
    };

    handleChange = (event) => {
        this.setState( {[event.target.name]: event.target.value} );
    }

    fetchAssignments = () => {
      console.log("Assignment.fetchAssignments");
      const token = Cookies.get('XSRF-TOKEN');
      fetch(`${SERVER_URL}/gradebook`,
        {
          method: 'GET',
          headers: { 'X-XSRF-TOKEN': token }
        } )
      .then((response) => response.json())
      .then((responseData) => {
        if (Array.isArray(responseData.assignments)) {
          //  add to each assignment an "id"  This is required by DataGrid  "id" is the row index in the data grid table
          this.setState({ assignments: responseData.assignments.map((assignment, index) => ( { id: index, ...assignment } )) });
        } else {
          toast.error("Fetch failed.", {
            position: toast.POSITION.BOTTOM_LEFT
          });
        }
      })
      .catch(err => console.error(err));
    }

    handleAdd = () => {
        fetch(`${SERVER_URL}/assignment`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assignmentName: this.state.assignmentName,
                    courseId: this.state.courseId,
                    dueDate: this.state.dueDate
                })
        })
        .then(res => {
            if (res.ok) {
                toast.success("Assignment successfully added!", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchAssignments();
            } else {
                toast.error("Error adding assignment!", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error('Post http status =' + res.status);
            }})
       .catch(err => {
           toast.error("Error when adding assignment", {
               position: toast.POSITION.BOTTOM_LEFT
           });
           console.error(err);
       })
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
                            name="assignmentName" onChange={this.handleChange} />
                        <br/><br/>
                        <TextField autoFocus fullWidth label="Course ID"
                            name="courseId" onChange={this.handleChange} />
                        <br/><br/>
                        <TextField autoFocus fullWidth label="Due Date"
                            name="dueDate" onChange={this.handleChange} />

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
