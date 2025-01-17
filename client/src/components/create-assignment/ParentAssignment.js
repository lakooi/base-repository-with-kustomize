// SPDX-FileCopyrightText: 2023 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LeafAssignment from './LeafAssignment';
import Assignment from './Assignment';
import assignmentServices from '../../services/assignments';
import formulasService from '../../services/formulas';

// An Assignmnet component with subAttainments and a formula

const ParentAssignment = ({ indices, addSubAttainments, setAttainments, attainments, removeAttainment, formulaAttributeNames, temporaryId, setIncrementId }) => {
  let navigate = useNavigate();

  // Functions and varibales for opening and closing the list of sub-attainments
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  /* Functions to get the formula attributes.
     formulaId specifies the formula that is used to calculate this assignmnet's garde,
     subFormulaAttributeNames are the attributes that need to be specified for the direct sub attainments of this attainments,
     so that the grade for this attainment can be calculated. 
     Observe that formulaAttributeNames that is as a parameter for this component are the attributes that need to specified for this assignmnet,
     so that the grade of this attainment's parent attainment can be calculated.
  */
  const formulaId = assignmentServices.getProperty(indices, attainments, 'formulaId');
  const formulaName = formulasService.getFormulaName(formulaId);
  const subFormulaAttributeNames = formulasService.getFormulaAttributes(formulaId);

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        px: 1
      }}>
        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left', mb: 0.5 }}>
          {'Grading Formula: ' + formulaName}
        </Typography>
        { /* Navigation below doesn't work because formula selection has only been implemented for course grade */ }
        <Button size='small' sx={{ mb: 0.5 }} onClick={ () => navigate('/select-formula') }>
          Edit formula
        </Button>
      </Box>
      <LeafAssignment
        indices={indices}
        addSubAttainments={addSubAttainments}
        attainments={attainments} 
        setAttainments={setAttainments} 
        removeAttainment={removeAttainment}
        formulaAttributeNames={formulaAttributeNames}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {open ? 
          <IconButton size='small' onClick={handleClick} sx={{ height: '32px', width: '32px', mr: 1  }}>
            <ExpandLess sx={{ color: 'primary.main' }}/>
          </IconButton>
          : 
          <IconButton size='small' onClick={handleClick} sx={{ height: '32px', width: '32px', mr: 1 }}>
            <ExpandMore sx={{ color: 'hoverGrey3' }}/>
          </IconButton>}
        <Box sx={{ display: 'flex', flexDirection: 'column',  width: '100%' }}>
          <Collapse in={!open} unmountOnExit >
            <Typography variant="body2" align='left' sx={{ mt: 0.6, mb: 2, flexGrow: 1, color: 'hoverGrey3' }}>
              See sub-attainments
            </Typography>
          </Collapse>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List disablePadding>
              {assignmentServices.getSubAttainments(indices, attainments).map((item, i) => (
                <Assignment 
                  indices={indices.concat(i)}
                  key={i}
                  attainments={attainments} 
                  setAttainments={setAttainments} 
                  removeAttainment={removeAttainment}
                  formulaAttributeNames={subFormulaAttributeNames ? subFormulaAttributeNames : []}
                  temporaryId={temporaryId}
                  setIncrementId={setIncrementId}
                />
              ))}
            </List>
          </Collapse>
        </Box>
      </Box>
    </>
  );
};

ParentAssignment.propTypes = {
  addSubAttainments: PropTypes.func,
  indices: PropTypes.array,
  attainments: PropTypes.array,
  setAttainments: PropTypes.func,
  removeAttainment: PropTypes.func,
  formulaAttributeNames: PropTypes.array,
  temporaryId: PropTypes.number,
  setIncrementId: PropTypes.func
};

export default ParentAssignment;