import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/DoDisturbAlt';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditSubFunctionalityPage() {
  const backLink = "http://localhost:5000";
  const location = useLocation();
  const { subFunctionalityId } = location.state || {};
  const [subFunctionality, setSubFunctionality] = useState(null);
  const navigate = useNavigate();
  
  // New states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [release, setRelease] = useState(''); // New release field
  const [reference, setReference] = useState(''); // New reference field
  const [functionalityName, setFunctionalityName] = useState(''); // To hold the related functionality name
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeDescription = (event) => setDescription(event.target.value);
  const handleChangeRelease = (event) => setRelease(event.target.value); // New handler for release
  const handleChangeReference = (event) => setReference(event.target.value); // New handler for reference

  useEffect(() => {
    const fetchSubFunctionality = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backLink}/subFunctionalities/subFunctionality/${subFunctionalityId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        setSubFunctionality(data);
        setName(data.name || '');
        setDescription(data.description || '');
        setRelease(data.release || '');
        setReference(data.reference || '');
        
        // Fetch the related functionality name
        if (data.functionality) {
          fetchFunctionalityName(data.functionality);
        }
      } catch (err) {
        console.error('Error fetching subFunctionality:', err);
      }
    };

    const fetchFunctionalityName = async (functionalityId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backLink}/functionalities/functionality/${functionalityId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFunctionalityName(response.data.name);
      } catch (err) {
        console.error('Error fetching functionality name:', err);
      }
    };

    fetchSubFunctionality();
  }, [subFunctionalityId]);

  const editSubFunctionality = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${backLink}/subFunctionalities/subFunctionality/${subFunctionalityId}`, {
        name,
        description,
        release,
        reference,
        functionality: subFunctionality.functionality // Keeping functionality ID unchanged
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      handleClick();
      setTimeout(() => navigate('/datasets/subFunctionalities'), 2000);
    } catch (err) {
      console.error('Error updating subFunctionality:', err);
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          SubFunctionality updated successfully!
        </Alert>
      </Snackbar>
        
      <Paper elevation={3}>
        <>&nbsp;</>
        <center><h3>&nbsp;Edit SubFunctionality</h3></center>
        {subFunctionality && (
          <Grid container spacing={2} sx={{ padding: "2%" }}>
            <Grid size={6}>
              <TextField 
                id="outlined-basic" 
                label="Name" 
                required 
                variant="outlined" 
                fullWidth 
                value={name} 
                onChange={handleChangeName} 
              />
            </Grid>
            <Grid size={6}>
              <TextField 
                id="functionality-name" 
                label="Functionality Name" 
                variant="outlined" 
                fullWidth 
                value={functionalityName}  
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                placeholder="Write a brief description about the created subFunctionality..."
                multiline
                rows={5}
                value={description}
                onChange={handleChangeDescription}
              />
            </Grid>
            
    
            <Grid size={8}>
              <></>
            </Grid>
    
            <Grid size={2}>
              <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/subFunctionalities')} startIcon={<CancelIcon />}>
                Cancel
              </Button>
            </Grid>
            <Grid size={2}>
              <Button variant="contained" fullWidth type='submit' onClick={editSubFunctionality} startIcon={<SaveIcon />}>
                Save
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
};
