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

export default function EditCiPage () {
  const backLink = "http://localhost:5000";
    const location = useLocation();
    const { ciId } = location.state || {}; // Access ciId from state
    const [ci, setCi] = React.useState(null);
    const navigate = useNavigate(); 
    const [identifier, setIdentifier] = React.useState('')
    const [status, setStatus] = React.useState('');
    const [interactionType, setInteractionType] = React.useState('');
    const [entryDoor, setEntryDoor] = React.useState('');
    const [createdBy, setCreatedBy] = React.useState('');
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

    const handleChangeIdentifier = (event) => {
        setIdentifier(event.target.value);
        ci.identifier = event.target.value;
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      ci.status = event.target.value;
    };
    const handleChangeInteractionType = (event) => {
        setInteractionType(event.target.value);
        ci.interaction_type = event.target.value;
      };
    const handleChangeEntryDoor = (event) => {
        setEntryDoor(event.target.value);
        ci.entry_door = event.target.value;
    }
    const handleChangeCreatedBy = (event) => {        
        setCreatedBy(event.target.value);
        ci.created_by = event.target.value;
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
        ci.description = event.target.value;
    }

    console.log("Ci ID:", ciId);


    React.useEffect(() => {
        const fetchCi = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you use token-based auth
                const response = await axios.get(`${backLink}/cis/ci/${ciId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCi(response.data); // Store ci data 
                
            } catch (err) {
                console.error('Error fetching ci:', err);
                
            }
        };

        fetchCi();
    }, [ciId]);


    const editCi = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const token = localStorage.getItem('token');
          await axios.put(`${backLink}/cis/ci/${ciId}`, ci, {
            headers: { Authorization: `Bearer ${token}` },
          });
           // Show success Snackbar
            handleClick();
          setTimeout(() => navigate('/datasets/cis'), 2000); // Redirect after 2 seconds
        } catch (err) {
          console.error('Error updating ci:', err);
        }
      };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Ci updated successfully!
      </Alert>
    </Snackbar>
        
        <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Edit Customer Interaction</h3></center>
        {ci && (
        
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Identifier" required variant="outlined" fullWidth value={identifier || ci?.identifier || ''} onChange={handleChangeIdentifier}/>
      </Grid>
      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status || ci?.status || ''}
          label="Status"
          onChange={handleChangeStatus}
        >
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Interaction Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={interactionType || ci?.interaction_type || ''}
          label="Interaction Type"
          onChange={handleChangeInteractionType}
        >
          <MenuItem value="Voice Inbound">Voice Inbound</MenuItem>
          <MenuItem value="SMS Outbound">SMS Outbound</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Entry Door</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={entryDoor || ci?.entry_door || ''}
          label="Entry Door"
          onChange={handleChangeEntryDoor}
        >
          <MenuItem value="Out UZO ITC ST">Out UZO ITC ST</MenuItem>
          <MenuItem value="Entry Door 2">Entry Door 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={4}>
      <TextField id="outlined-basic" label="Created By" variant="outlined" fullWidth value={createdBy || ci?.created_by || ''} onChange={handleChangeCreatedBy}/>
      </Grid>

      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created ci..."
            multiline
            rows={5}
            value={description || ci?.description || ''}
            onChange={handleChangeDescription}
            required
            />
            </Grid>
    
    <Grid size={8}>
        <></>
    </Grid>

    <Grid size={2}>
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/cis')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={editCi} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    
        )}
    </Paper>
    </>
    );
};
