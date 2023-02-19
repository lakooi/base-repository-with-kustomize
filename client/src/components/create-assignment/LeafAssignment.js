// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SimpleDialog from './SimpleDialog';
import ConfirmationDialog from './ConfirmationDialog';
import StringTextField from './StringTextField';
import DateTextField from './DateTextField';
import assignmentServices from '../../services/assignments';

// An Assignmnet component without subassignments and hence without a formula as well.
// If this isn't the root Assignment, this can be deleted

const categoryData = {
  fieldId: 'category',
  fieldLabel: 'Name'
};

const nameData = {
  fieldId: 'assignmentName',
  fieldLabel: 'New Name'
};
  
const dateData = {
  fieldId: 'assignmentDate',
  fieldLabel: 'Date'
};
    
const expiryData = {
  fieldId: 'expiryDate',
  fieldLabel: 'Expiry Date'
};

const LeafAssignment = ({ indices, addSubAssignments, setAssignments, assignments, removeAssignment }) => {

  // Functions and varibales for handling the change of the value in the 'Name' (category) textfield.
  // If the value is 'Other', then the 'New Name' textfield is displayed; 
  // otherwise the name is the same as the category
  const handleChange = (event) => {
    const value = event.target.value;
    let updatedAssignments = assignmentServices.setProperty(indices, assignments, 'category', value);
    if (value === 'Other') {
      setDisplayNewName(true);
      updatedAssignments = assignmentServices.setProperty(indices, updatedAssignments, 'name', '');
    } else {
      setDisplayNewName(false);
      updatedAssignments = assignmentServices.setProperty(indices, updatedAssignments, 'name', value);
    }
    setAssignments(updatedAssignments);
  };

  const getValue = (fieldData) => {
    if (fieldData.fieldId === 'category') {
      return assignmentServices.getProperty(indices, assignments, 'category');
    } else {
      console.log(fieldData.fieldId);
    }
  };

  const [displayNewName, setDisplayNewName] = useState(getValue(categoryData) === 'Other');

  // Functions and varibales for opening and closing the dialog that asks for the number of sub-assignments
  const [openCountDialog, setOpenCountDialog] = useState(false);

  const handleCountDialogOpen = () => {
    setOpenCountDialog(true);
  };

  const handleCountDialogClose = () => {
    setOpenCountDialog(false);
  };

  // Functions and varibales for opening and closing the dialog for confirming sub-assignment deletion
  const [openConfDialog, setOpenConfDialog] = useState(false);

  const handleConfDialogOpen = () => {
    setOpenConfDialog(true);
  };

  const handleConfDialogClose = () => {
    setOpenConfDialog(false);
  };

  return (
    <Box sx={{
      bgcolor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 2, 
      borderRadius: 2,
      px: 3,
      py: 1,
      mb: 1
    }}>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridTemplateRows: 'auto',
        columnGap: 3,
        rowGap: 1,
        mt: 2,
      }}>
        <TextField 
          id={categoryData.fieldId}
          label={categoryData.fieldLabel}
          variant='standard' 
          value={getValue(categoryData)}
          onChange={(event) => handleChange(event)}
          InputLabelProps={{ shrink: true }} 
          sx={{ textAlign: 'left' }} 
          select>
          <MenuItem value='Exercise'>Exercise</MenuItem>
          <MenuItem value='Exam'>Exam</MenuItem>
          <MenuItem value='Project'>Project</MenuItem>
          <MenuItem value='Other'>Other</MenuItem>
        </TextField>
        <Collapse in={displayNewName} timeout={0} unmountOnExit>
          <StringTextField fieldData={nameData} indices={indices} setAssignments={setAssignments} assignments={assignments}/>
        </Collapse>
        <DateTextField fieldData={dateData} indices={indices} setAssignments={setAssignments} assignments={assignments}/>
        <DateTextField fieldData={expiryData} indices={indices} setAssignments={setAssignments} assignments={assignments}/>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {JSON.stringify(indices) !== '[0]' ?
          <Button size='small' sx={{ my: 1 }} onClick={handleConfDialogOpen}>
            Delete
          </Button>
          : 
          <Box sx={{ width: '1px' }}/>}
        <ConfirmationDialog
          open={openConfDialog}
          handleClose={handleConfDialogClose}
          removeAssignment={removeAssignment}
          indices={indices}
          assignments={assignments}
        />
        {assignmentServices.getSubAssignments(indices, assignments).length === 0 ?
          <Button size='small' sx={{ my: 1 }} onClick={handleCountDialogOpen}>
            Create sub-assignments
          </Button>
          :
          <Button size='small' sx={{ my: 1 }} onClick={handleCountDialogOpen}>
            Add sub-assignments
          </Button>}
      </Box>
      <SimpleDialog
        open={openCountDialog}
        handleClose={handleCountDialogClose}
        addSubAssignments={addSubAssignments}
        indices={indices}
        assignments={assignments}
      />
    </Box>
  );
};

LeafAssignment.propTypes = {
  addSubAssignments: PropTypes.func,
  indices: PropTypes.array,
  assignments: PropTypes.array,
  setAssignments: PropTypes.func,
  removeAssignment: PropTypes.func
};

export default LeafAssignment;