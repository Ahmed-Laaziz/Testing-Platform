import * as React from 'react';
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
const backLink = "http://localhost:5000";

export default function ValidationTextFields() {

    const navigate = useNavigate(); 
    const [identifier, setIdentifier] = React.useState('')
    const [status, setStatus] = React.useState('');
    const [interactionType, setInteractionType] = React.useState('');
    const [entryDoor, setEntryDoor] = React.useState('');
    const [createdBy, setCreatedBy] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const userEnv = localStorage.getItem('userEnv'); // Retrieve userEnv
  
        if (!userEnv) {
          console.warn("User environment (userEnv) is not set.");
          return;
        }
  
        // Define the branch based on userEnv
        let branch;
        if (userEnv === "DEV") {
          branch = "New_DevCI_Draft"; // Replace with the actual DEV branch name
        } else {
          branch = "Draft_tests_branch"; // Use userEnv as branch name for other environments
        }
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
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    };
    const handleChangeInteractionType = (event) => {
        setInteractionType(event.target.value);
      };
    const handleChangeEntryDoor = (event) => {
        setEntryDoor(event.target.value)
    }
    const handleChangeCreatedBy = (event) => {        
        setCreatedBy(event.target.value);
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }
    

    const fetchCiCount = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${backLink}/cis/count-cis/${branch}` ,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.count;
        } catch (error) {
            console.error("Error fetching ci count:", error);
            return 0; // Default to 0 if there's an error
        }
    };

    const generateTypeField = async () => {
        try {
          const ciCount = await fetchCiCount(); // Fetch the count of cis
          const newType = `type${(ciCount + 1).toString().padStart(2, '0')}`; // Generate the new type value with leading zero if needed
          return newType;
        } catch (error) {
          console.error("Error generating type field:", error);
          return null; // Return null or handle errors as needed
        }
      };
      
    

    const addCi = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
        const token = localStorage.getItem('token');
        const userEnv = localStorage.getItem('userEnv'); // Retrieve userEnv
  
        if (!userEnv) {
          console.warn("User environment (userEnv) is not set.");
          return;
        }
  
        // Define the branch based on userEnv
        let branch;
        if (userEnv === "DEV") {
          branch = "New_DevCI_Draft"; // Replace with the actual DEV branch name
        } else {
          branch = "Draft_tests_branch"; // Use userEnv as branch name for other environments
        }
        const type = await generateTypeField();
        console.log("this is the type value " + type);
        try {
          const url = backLink+"/cis/add-ci"; // URL for the backend API
          const requestData = {
            type: type,
            identifier: identifier,
            status: status,
            interaction_type: interactionType,
            entry_door: entryDoor,
            created_by: createdBy,
            description: description,
            branch: branch
          };
      
          // Make a POST request to your backend API
          const response = await axios.post(url, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Show success Snackbar
          handleClick();
          setTimeout(() => navigate('/datasets/cis'), 2000); // Redirect after 2 seconds
        } catch (error) {
          console.error("Error fetching abstract:", error);
        } finally {
          // Hide the spinner after the backend request is completed
          // setIsLoading(false);
        }
      };
      
  return (
    <>
    {/* Snackbar for success message */}
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
    customer interaction created successfully!
  </Alert>
</Snackbar>
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Add New Customer Interaction</h3></center>
        <form onSubmit={addCi}>
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Identifier" required variant="outlined" fullWidth value={identifier} onChange={handleChangeIdentifier}/>
      </Grid>
      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
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
          value={interactionType}
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
          value={entryDoor}
          label="Entry Door"
          onChange={handleChangeEntryDoor}
        >
          <MenuItem value="Out UZO ITC ST">Out UZO ITC ST</MenuItem>
          <MenuItem value="Entry Door 2">Entry Door 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={4}>
      <TextField id="outlined-basic" label="Created By" variant="outlined" fullWidth value={createdBy} onChange={handleChangeCreatedBy}/>
      </Grid>



      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created ci..."
            multiline
            rows={5}
            value={description}
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
    <Button variant="contained" fullWidth type='submit' startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    </form>
    </Paper>
    </>
  );
}
