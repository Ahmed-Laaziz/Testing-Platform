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

export default function EditCasePage () {
  const backLink = "http://localhost:5000";
    const location = useLocation();
    const { caseId } = location.state || {}; // Access caseId from state
    const [aCase, setCase] = React.useState(null);
    const navigate = useNavigate(); 
    const [identifier, setIdentifier] = React.useState('')
    const [status, setStatus] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [open, setOpen] = useState(false);

    const [caseOrigin, setCaseOrigin] = React.useState('');
    const [channel, setChannel] = React.useState('');
    const [subChannel, setSubChannel] = React.useState('');
    const [insistence, setInsistence] = React.useState('false');
    const [relapse, setRelapse] = React.useState('false');
    const [createdBy, setCreatedBy] = React.useState('');
    const [typification, setTypification] = React.useState('');
    const [entryDoor, setEntryDoor] = React.useState('');
    

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
        aCase.identifier = event.target.value;
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      aCase.status = event.target.value;
    };
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
        aCase.description = event.target.value;
    }
    const handleChangeCaseOrigin= (event) => {
        setCaseOrigin(event.target.value);
        aCase.case_origin = event.target.value;
      };
    const handleChannel = (event) => {
        setChannel(event.target.value)
        aCase.channel = event.target.value;
    }
    const handleSubChannel = (event) => {
        setSubChannel(event.target.value)
        aCase.subChannel = event.target.value;
    }
    const handleRelapseChange = (event) => {        
        setRelapse(event.target.value);
        aCase.relapse = event.target.value;
    }
    const handleInsistenceChange = (event) => {        
        setInsistence(event.target.value);
        aCase.insistence = event.target.value;
    }
    const handleChangeCreatedBy = (event) => {
        setCreatedBy(event.target.value);
        aCase.created_by = event.target.value;
    }
    const handleChangeTypification = (event) => {
        setTypification(event.target.value);
        aCase.typification = event.target.value;
    }
    const handleChangeEntryDoor = (event) => {
        setEntryDoor(event.target.value);
        aCase.entry_door = event.target.value;
    }

   

    console.log("Case ID:", caseId);


    React.useEffect(() => {
        const fetchCase = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you use token-based auth
                const response = await axios.get(`${backLink}/cases/case/${caseId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCase(response.data); // Store aCase data 
                
            } catch (err) {
                console.error('Error fetching aCase:', err);
                
            }
        };

        fetchCase();
    }, [caseId]);

    React.useEffect(() => {
        if (aCase) {
          setRelapse(aCase.relapse ? "true" : "false"); // Set inflight state based on aCase value
          setInsistence(aCase.insistence ? "true" : "false");
        }
      }, [aCase])

    const editCase = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const token = localStorage.getItem('token');
          await axios.put(`${backLink}/cases/case/${caseId}`, aCase, {
            headers: { Authorization: `Bearer ${token}` },
          });
           // Show success Snackbar
            handleClick();
          setTimeout(() => navigate('/datasets/cases'), 2000); // Redirect after 2 seconds
        } catch (err) {
          console.error('Error updating aCase:', err);
        }
      };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Case updated successfully!
      </Alert>
    </Snackbar>
        
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Add New Case</h3></center>
        {aCase && (
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Identifier" required variant="outlined" fullWidth value={identifier || aCase?.identifier || ''} onChange={handleChangeIdentifier}/>
      </Grid>
      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status || aCase?.status || ''}
          label="Status"
          onChange={handleChangeStatus}
        >
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
          <MenuItem value="In Treatment">In Treatment</MenuItem>
          <MenuItem value="Forwarded">Forwarded</MenuItem>
          <MenuItem value="Pending Customer">Pending Customer</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Sending">Sending</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={6}>
      <TextField id="outlined-basic" label="Created By" variant="outlined" fullWidth value={createdBy || aCase?.created_by || ''} onChange={handleChangeCreatedBy}/>
      </Grid>

      <Grid size={6}>
      <TextField id="outlined-basic" label="Typification" variant="outlined" fullWidth value={typification || aCase?.typification || ''} onChange={handleChangeTypification}/>
      </Grid>

      <Grid size={2}>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Relapse ?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={relapse}
        onChange={handleRelapseChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No"/>
      </RadioGroup>
    </FormControl>
        </Grid>


        <Grid size={2}>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Insistence ?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={insistence}
        onChange={handleInsistenceChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No"/>
      </RadioGroup>
    </FormControl>
        </Grid>


      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Channel</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={channel || aCase?.channel || ''}
          label="Channel"
          onChange={handleChannel}
        >
          <MenuItem value="Channel 1">Channel 1</MenuItem>
          <MenuItem value="Channel 2">Channel 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sub Channel</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subChannel || aCase?.subChannel || ''}
          label="Sub Channel"
          onChange={handleSubChannel}
        >
          <MenuItem value="Sub Channel 1">Sub Channel 1</MenuItem>
          <MenuItem value="Sub Channel 2">Sub Channel 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Case Origin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={caseOrigin || aCase?.case_origin || ''}
          label="Case Origin"
          onChange={handleChangeCaseOrigin}
        >
          <MenuItem value="Cliente">Cliente</MenuItem>
          <MenuItem value="Case Origin 2">Case Origin 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Entry Door</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={entryDoor || aCase?.entry_door || ''}
          label="Entry Door"
          onChange={handleChangeEntryDoor}
        >
          <MenuItem value="Out UZO ITC ST">Out UZO ITC ST</MenuItem>
          <MenuItem value="Test SIT">Test SIT</MenuItem>
        </Select>
      </FormControl>
      </Grid>


      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created case..."
            multiline
            rows={5}
            value={description || aCase?.description || ''}
            onChange={handleChangeDescription}
            required
            />
            </Grid>
    
    <Grid size={8}>
        <></>
    </Grid>

    <Grid size={2}>
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/cases')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={editCase} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    )}
    </Paper>
    </>
    );
};
