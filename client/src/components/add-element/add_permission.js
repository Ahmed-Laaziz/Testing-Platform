import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, IconButton, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const backLink = process.env.REACT_APP_BACK_LINK;

const PermissionManager = () => {
  const [personas, setPersonas] = useState([]);
  const [subFunctionalities, setSubFunctionalities] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedSubFunctionality, setSelectedSubFunctionality] = useState(null);
  const [permission, setPermission] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [initialPermission, setInitialPermission] = useState(null);

  // Fetch personas from the backend
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backLink}/personas/all-personas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPersonas(response.data);
      } catch (error) {
        console.error('Error fetching personas:', error);
      }
    };
    fetchPersonas();
  }, []);

  // Fetch sub-functionalities when a valid persona is selected
  useEffect(() => {
    if (selectedPersona) {
      const fetchSubFunctionalities = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${backLink}/subfunctionalities/all-subfunctionalities`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSubFunctionalities(response.data);
        } catch (error) {
          console.error('Error fetching subfunctionalities:', error);
        }
      };
      fetchSubFunctionalities();
    }
  }, [selectedPersona]);

  // Fetch permission when both persona and sub-functionality are selected
  useEffect(() => {
    if (selectedPersona && selectedSubFunctionality) {
      const fetchPermission = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${backLink}/subfunctionalities/subfunctionality/${selectedSubFunctionality._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const permissionData = response.data.permissions.find(
            (perm) => perm.persona._id === selectedPersona._id
          );
          const hasPermission = permissionData ? permissionData.hasPermission : 'Not Assigned';
          setPermission(hasPermission);
          setInitialPermission(hasPermission);
        } catch (error) {
          console.error('Error fetching permission:', error);
        }
      };
      fetchPermission();
    }
  }, [selectedPersona, selectedSubFunctionality]);

  // Toggle permission when editing
  const handleTogglePermission = () => {
    setPermission((prev) => (prev === true ? false : true));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${backLink}/subfunctionalities/subfunctionality/${selectedSubFunctionality._id}/permissions`, {
        permissions: [{
          persona: selectedPersona._id,
          hasPermission: permission
        }],
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInitialPermission(permission);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };
  

  // Cancel editing, revert to initial permission
  const handleCancel = () => {
    setPermission(initialPermission);
    setIsEditing(false);
  };

  return (
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Permissions Management</h3></center>
        <>&nbsp;</>
    <div style={{marginLeft:'2%', marginBottom:'2%'}}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
        <Autocomplete
          options={personas}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setSelectedPersona(newValue)}
          renderInput={(params) => <TextField {...params} label="Select Persona" />}
          style={{ marginRight: '2%', width: '40%' }}
        />
        <Autocomplete
          options={subFunctionalities}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setSelectedSubFunctionality(newValue)}
          renderInput={(params) => <TextField {...params} label="Select Sub-Functionality" />}
          style={{ marginRight: '2%', width: '40%' }}
          disabled={!selectedPersona} // Disable if persona is not selected
        />
        {/* <Button
          variant="contained"
          disabled={!selectedPersona || !selectedSubFunctionality}
          onClick={() => {
            // Triggering the permission fetch logic
            setPermission(null);
            setInitialPermission(null);
          }}
        >
          Submit
        </Button> */}
      </div>

      {permission !== null && (
        <div style={{marginLeft:'2%'}}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Typography variant="h6" style={{ marginRight: '2%' }}>
              Permission:
            </Typography>
            {permission === 'Not Assigned' ? (
              <Typography variant="body1" style={{ color: 'gray', fontSize: '30px' }}>NA</Typography>
            ) : permission === true ? (
              <CheckIcon style={{ color: 'green', fontSize: '30px' }} />
            ) : (
              <CloseIcon style={{ color: 'red', fontSize: '30px' }} />
            )}
            <IconButton onClick={() => setIsEditing(true)} style={{ marginLeft: '20px' }} disabled={isEditing}>
              <EditIcon />
            </IconButton>
          </div>

          {isEditing && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                onClick={handleTogglePermission}
                style={{ marginRight: '10px' }}
              >
                {permission === true ? 'Revoke Permission' : 'Grant Permission'}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                style={{ marginRight: '10px' }}
              >
                <SaveIcon />
                Save
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCancel}
                disabled={!isEditing}
              >
                <CancelIcon />
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
    <>&nbsp;</>
    </Paper>
  );
};

export default PermissionManager;
