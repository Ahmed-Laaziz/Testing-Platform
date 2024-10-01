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
    const [caseOrigin, setCaseOrigin] = React.useState('');
    const [channel, setChannel] = React.useState('');
    const [subChannel, setSubChannel] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [insistence, setInsistence] = React.useState('false');
    const [relapse, setRelapse] = React.useState('false');
    const [open, setOpen] = React.useState(false);
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
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    };
    const handleChangeCaseOrigin= (event) => {
        setCaseOrigin(event.target.value);
      };
    const handleChannel = (event) => {
        setChannel(event.target.value)
    }
    const handleSubChannel = (event) => {
        setSubChannel(event.target.value)
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleRelapseChange = (event) => {        
        setRelapse(event.target.value);
    }
    const handleInsistenceChange = (event) => {        
        setInsistence(event.target.value);
    }
    const handleChangeCreatedBy = (event) => {
        setCreatedBy(event.target.value);
    }
    const handleChangeTypification = (event) => {
        setTypification(event.target.value);
    }
    const handleChangeEntryDoor = (event) => {
        setEntryDoor(event.target.value);
    }

    const fetchCaseCount = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${backLink}/cases/count-cases` ,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.count;
        } catch (error) {
            console.error("Error fetching case count:", error);
            return 0; // Default to 0 if there's an error
        }
    };

    const generateTypeField = async () => {
        try {
          const caseCount = await fetchCaseCount(); // Fetch the count of cases
          const newType = `type${(caseCount + 1).toString().padStart(2, '0')}`; // Generate the new type value with leading zero if needed
          return newType;
        } catch (error) {
          console.error("Error generating type field:", error);
          return null; // Return null or handle errors as needed
        }
      };
      
    

    const addCase = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
        const token = localStorage.getItem('token');
        const type = await generateTypeField();
        try {
          const url = backLink+"/cases/add-case"; // URL for the backend API
          const requestData = {
            type: type,
            identifier: identifier,
            status: status,
            typification: typification,
            case_origin: caseOrigin,
            relapse: relapse,
            insistence: insistence,
            description: description,
            created_by: createdBy,
            channel: channel,
            subChannel: subChannel,
            entry_door: entryDoor,
            branch: "Draft_tests_branch"
          };
      
          // Make a POST request to your backend API
          const response = await axios.post(url, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Show success Snackbar
          handleClick();
          setTimeout(() => navigate('/datasets/cases'), 2000); // Redirect after 2 seconds
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
    Case created successfully!
  </Alert>
</Snackbar>
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Add New Case</h3></center>
        <form onSubmit={addCase}>
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
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={6}>
      <TextField id="outlined-basic" label="Created By" variant="outlined" fullWidth value={createdBy} onChange={handleChangeCreatedBy}/>
      </Grid>

      <Grid size={6}>
      <TextField id="outlined-basic" label="Typification" variant="outlined" fullWidth value={typification} onChange={handleChangeTypification}/>
      </Grid>

      <Grid size={2}>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Relapse ?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="false"
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
        defaultValue="false"
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
          value={channel}
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
          value={subChannel}
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
          value={caseOrigin}
          label="Case Origin"
          onChange={handleChangeCaseOrigin}
        >
          <MenuItem value="Case Origin 1">Case Origin 1</MenuItem>
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
          value={entryDoor}
          label="Entry Door"
          onChange={handleChangeEntryDoor}
        >
          <MenuItem value="Entry Door 1">Entry Door 1</MenuItem>
          <MenuItem value="Entry Door 2">Entry Door 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>


      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created case..."
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
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/cases')} startIcon={<CancelIcon/>}>
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
