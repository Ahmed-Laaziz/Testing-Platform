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

export default function EditAssetPage () {
  const backLink = "http://localhost:5000";
    const location = useLocation();
    const { processId } = location.state || {}; 
    const [process, setProcess] = React.useState(null);
    const navigate = useNavigate(); 
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('');
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
        process.name = event.target.value;
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
        process.description = event.target.value;
    }
    

    console.log("Process ID:", processId);


    React.useEffect(() => {
        const fetchProcess = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you use token-based auth
                const response = await axios.get(`${backLink}/processes/process/${processId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProcess(response.data); 
                
            } catch (err) {
                console.error('Error fetching process:', err);
                
            }
        };

        fetchProcess();
    }, [processId]);


    const editProcess = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const token = localStorage.getItem('token');
          await axios.put(`${backLink}/processes/process/${processId}`, process, {
            headers: { Authorization: `Bearer ${token}` },
          });
           // Show success Snackbar
            handleClick();
          setTimeout(() => navigate('/datasets/processes'), 2000); // Redirect after 2 seconds
        } catch (err) {
          console.error('Error updating process:', err);
        }
      };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Process updated successfully!
      </Alert>
    </Snackbar>
        
        <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Edit Process</h3></center>
        {process && (
        
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Name" required variant="outlined" fullWidth value={name || process?.name || ''} onChange={handleChangeName}/>
      </Grid>
      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created process..."
            multiline
            rows={5}
            value={description || process?.description || ''}
            onChange={handleChangeDescription}
            />
            </Grid>
    
    <Grid size={8}>
        <></>
    </Grid>

    <Grid size={2}>
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/processes')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={editProcess} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    
        )}
    </Paper>
    </>
    );
};
