// SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from 'styled-components';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import FrontPage from './components/FrontPage';
import CourseView from './components/CourseView';
import CreateCourseView from './components/CreateCourseView';
import FetchInstancesView from './components/FetchInstancesView';
import EditInstanceView from './components/EditInstanceView';
import AddAssignmentsView from './components/AddAssignmentsView';
import InstanceSummaryView from './components/InstanceSummaryView';
import SelectFormulaView from './components/SelectFormulaView';
import FormulaAttributesView from './components/FormulaAttributesView';
import CreateAssignmentView from './components/CreateAssignmentView';
import EditAssignmentView from './components/EditAssignmentView';
import CourseResultsView from './components/CourseResultsView';
import InstanceCreationRoute from './context/InstanceCreationRoute';
import FormulaSelectionRoute from './context/FormulaSelectionRoute';
import useLogout from './hooks/useLogout';

const theme = createTheme({
  palette: {
    black: '#000000',
    primary: {
      light: '#EFF3FB',
      main: '#3D5AFE',
      dark: '#0031CA',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#F1F8F0',
      main: '#96CF99',
      dark: '#519657',
      contrastText: '#000',
    },
    info: {
      light: '#FFC046',
      main: '#FF8F00',
      dark: '#C56000',
      contrastText: '#000',
    },
    hoverGrey1: '#EAEAEA',
    hoverGrey2: '#F4F4F4',
    hoverGrey3: '#6E6E6E',
    infoGrey: '#545454',
    contrastThreshold: 4.5
  },
  typography: {
    h1: {
      fontSize: '48px',
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400'
    },
    h2: {
      fontSize: '34px',
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400'
    },
    h3: {
      fontSize: '20px',
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400'
    },
    body1: {
      fontSize: '16px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400'
    },
    body2: {
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400'
    },
    textInput: {
      fontSize: '16px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400'
    },
    button: {
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '500'
    },
    caption: {
      fontSize: '12px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400'
    },
  }
});

const AppContainer = styled(Container)`
  text-align: center;
`;

const roles = {
  'admin': 'SYSADMIN',
  'teacher': 'TEACHER',
  'student': 'STUDENT',
  'assistant': 'ASSISTANT'
};

function App() {
  const logout = useLogout();
  const navigate = useNavigate();

  // temporary function for logging out, will be moved to a seperate file once toolbar is refined
  const signOut = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Link 
            href="/" 
            underline="none" 
            color="white" 
            variant="h5" 
            align="left"
            sx={{ mr: 2 }}
          >
          Aalto Grades
          </Link>
          <button onClick={signOut}>
            Sign out
          </button>
        </Toolbar>
      </AppBar>
      <AppContainer maxWidth="lg">
        <Box mx={5} my={5}>
          <Routes> { /* Add nested routes when needed */ }
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            { /* All roles are authorised to access the front page, conditional rendering is done inside the component */ }
            <Route element={<PrivateRoute roles={[roles.admin, roles.teacher, roles.student, roles.assistant]}/>}>
              <Route path='/' element={<FrontPage/>} />
              <Route path='/course-view/:courseId' element={<CourseView/>}/>
            </Route>
            { /* Pages that are only authorised for admin */ }
            <Route element={<PrivateRoute roles={[roles.admin]}/>}>
              <Route path='/create-course' element={<CreateCourseView/>}/>
            </Route>
            { /* Pages that are authorised for admin and teachers */ }
            <Route element={<PrivateRoute roles={[roles.admin, roles.teacher]}/>}>
              <Route path=':courseId/fetch-instances/:courseCode' element={<FetchInstancesView/>}/>
              <Route path=':courseId/course-results/:instanceId' element={<CourseResultsView/>}/>
              { /* Pages under this route share instance creation context */ }
              <Route element={<InstanceCreationRoute/>}>
                <Route path=':courseId/edit-instance/:sisuInstanceId' element={<EditInstanceView/>}/>
                <Route path=':courseId/add-attainments/:sisuInstanceId' element={<AddAssignmentsView/>}/>
                <Route path=':courseId/instance-summary/:sisuInstanceId' element={<InstanceSummaryView/>}/>
                <Route path=':courseId/create-temporary-attainment/:sisuInstanceId' element={<CreateAssignmentView/>}/>
                <Route path=':courseId/edit-temporary-attainment/:sisuInstanceId/:attainmentId' element={<EditAssignmentView/>}/>
              </Route>
              <Route path=':courseId/create-attainment/:instanceId' element={<CreateAssignmentView/>}/>
              <Route path=':courseId/edit-attainment/:instanceId/:attainmentId' element={<EditAssignmentView/>}/>
              <Route element={<FormulaSelectionRoute/>}>
                <Route path='/:courseId/select-formula/:instanceId/' element={<SelectFormulaView/>}/>
                <Route path='/:courseId/formula-attributes/:instanceId/' element={<FormulaAttributesView/>}/>
                { /* '/:attainmentId' will be added to the paths above once they work for sub-attainments */ }
              </Route>
            </Route>
          </Routes>
        </Box>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
