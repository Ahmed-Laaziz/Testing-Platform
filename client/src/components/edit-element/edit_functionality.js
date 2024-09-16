import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/DoDisturbAlt';
import Autocomplete from '@mui/material/Autocomplete';

export default function EditAssetPage () {
  const backLink = "http://localhost:5000";
    const location = useLocation();
    const { functionalityId } = location.state || {}; 
    const [functionality, setFunctionality] = React.useState(null);
    const navigate = useNavigate(); 
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('');
    const [processId, setProcessId] = useState(''); // Related process ID
    const [processName, setProcessName] = useState(''); // Related process name
    const [allProcesses, setAllProcesses] = useState([]); // List of all available processes for autocomplete
    const [open, setOpen] = useState(false);
    

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
        functionality.name = event.target.value;
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
        functionality.description = event.target.value;
    }

    const handleProcessChange = (event, newValue) => {
      const selectedProcess = allProcesses.find((process) => process.name === newValue);
      setProcessName(newValue);
      if (selectedProcess) {
        setProcessId(selectedProcess.id); // Store the process ID
        functionality.processId = selectedProcess.id;
      }
    };
    

    console.log("Functionality ID:", functionalityId);


    React.useEffect(() => {
      const fetchFunctionality = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${backLink}/functionalities/functionality/${functionalityId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFunctionality(response.data);
          setName(response.data.name || '');
          setDescription(response.data.description || '');
          setProcessId(response.data.processId || ''); // Default process ID
  
          if (response.data.processId) {
            // Fetch the process name by its ID
            fetchProcessById(response.data.processId);
          }
        } catch (err) {
          console.error('Error fetching functionality:', err);
        }
      };
  
      const fetchProcesses = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${backLink}/processes/all-processes`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAllProcesses(response.data); // Assuming this returns a list of processes with `id` and `name`
        } catch (err) {
          console.error('Error fetching processes:', err);
        }
      };
  
      const fetchProcessById = async (id) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${backLink}/processes/process/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProcessName(response.data.name); // Set the process name based on the ID
        } catch (err) {
          console.error('Error fetching process by ID:', err);
        }
      };
  
      fetchFunctionality();
      fetchProcesses();
    }, [functionalityId]);
  
    const editFunctionality = async (event) => {
      event.preventDefault();
  
      try {
        const token = localStorage.getItem('token');
        await axios.put(`${backLink}/functionalities/functionality/${functionalityId}`, functionality, {
          headers: { Authorization: `Bearer ${token}` }
        });
        handleClick();
        setTimeout(() => navigate('/datasets/functionalities'), 2000);
      } catch (err) {
        console.error('Error updating functionality:', err);
      }
    };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Functionality updated successfully!
      </Alert>
    </Snackbar>
        
        <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Edit Functionality</h3></center>
        {functionality && (
        
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Name" required variant="outlined" fullWidth value={name || functionality?.name || ''} onChange={handleChangeName}/>
      </Grid>
      <Grid size={6}> 
  <Autocomplete
    value={processName}
    onChange={handleProcessChange}
    options={allProcesses.map((process) => process.name)}
    renderInput={(params) => (
      <TextField 
        {...params} 
        label="Process Name" 
        variant="outlined" 
        fullWidth // Ensure TextField takes full width
      />
    )}
    freeSolo // Allow users to input custom process names
  />
</Grid>

      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created functionality..."
            multiline
            rows={5}
            value={description || functionality?.description || ''}
            onChange={handleChangeDescription}
            />
            </Grid>
    
    <Grid size={8}>
        <></>
    </Grid>

    <Grid size={2}>
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/functionalities')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={editFunctionality} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    
        )}
    </Paper>
    </>
    );
};
