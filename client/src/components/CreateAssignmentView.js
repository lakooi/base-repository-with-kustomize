// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import React, { useState }  from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Assignment from './create-assignment/Assignment';
import assignmentServices from '../services/assignments'; 

const CreateAssignmentView = () => {
  const navigate = useNavigate();
  const { courseId, instanceId, sisuInstanceId } = useParams();
  let addedAttainments, setAddedAttainments, attainmentIncrementId, setIncrementId;
  
  // If this view is opened during the creation of an instance, get the necessary data from the context
  if (sisuInstanceId) {
    ({ addedAttainments, setAddedAttainments, attainmentIncrementId, setIncrementId } = useOutletContext());
  }

  // The property 'category' must be specified for each attainment in order to populate the textfields correctly
  const [attainments, setAttainments] = useState([{
    category: '',
    name: '',
    date: '',
    expiryDate: '',
    affectCalculation: false,
    formulaAttributes: {},
    subAttainments: [],
  }]);

  // Function to add data to the database
  const addAttainment = async (attainmentObject) => {
    try {
      const attainment = await assignmentServices.addAttainment(courseId, instanceId, attainmentObject);
      console.log(attainment);
      //navigate('/' + courseId, { replace: true });
    } catch (exception) {
      console.log(exception.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      // If this view is opened from the course view, add to DB
      // Else the attainment is being created during the creation of an instance so only add to the context
      if (instanceId) {
        const updatedAttainments = assignmentServices.formatStringsToDates(attainments)[0];
        addAttainment(updatedAttainments);
        navigate(-1);
      } else if (sisuInstanceId) {
        const temporaryId = attainmentIncrementId;
        const [updatedAttainments, newTemporaryId] = assignmentServices.createTemporaryAttainment(addedAttainments, attainments[0], temporaryId);
        setAddedAttainments(updatedAttainments);
        setIncrementId(newTemporaryId);
        navigate(-1);
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const removeAttainment = (indices) => {
    const updatedAttainments = assignmentServices.removeAttainment(indices, attainments);
    setAttainments(updatedAttainments);
  };

  return(
    <>
      <Container maxWidth="md" sx={{ textAlign: 'right' }}>
        <Typography variant="h1" align='left' sx={{ flexGrow: 1, mb: 4 }}>
            Create Study Attainment
        </Typography>
        <form>
          <Box sx={{ 
            bgcolor: 'primary.light',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            my: 2,
            pt: 3,
            pb: 1,
            px: 2,
          }}>
            {/* Create the root attainment */}
            <Assignment 
              indices={[0]}
              attainments={attainments} 
              setAttainments={setAttainments} 
              removeAttainment={removeAttainment}
              temporaryId={attainmentIncrementId}
              setIncrementId={setIncrementId}
            />
          </Box>
          <Button size='medium' variant='outlined' onClick={ () => navigate(-1) } sx={{ mr: 1 }}>
                Cancel
          </Button>
          <Button size='medium' variant='contained' type='submit' onClick={handleSubmit} sx={{ mr: 2 }}>
                Confirm
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CreateAssignmentView;
