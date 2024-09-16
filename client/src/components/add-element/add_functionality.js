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
    const [name, setName] = React.useState('') 
    const [description, setDescription] = React.useState('');
    const [process, setProcess] = React.useState(''); // For selected process ID
    const [processes, setProcesses] = React.useState([]); // For fetched processes
    const [open, setOpen] = React.useState(false);
    
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
    }
    
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeProcess = (event) => {
        setProcess(event.target.value); // Store selected process ID
      };

    // Fetch processes when the component mounts
  React.useEffect(() => {
    const fetchProcesses = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(backLink + "/processes/all-processes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProcesses(response.data); // Assuming the response is an array of processes
      } catch (error) {
        console.error("Error fetching processes:", error);
      }
    };

    fetchProcesses();
  }, []);

    
    

    const addFunctionality = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const token = localStorage.getItem('token');
        try {
          const url = backLink+"/functionalities/add-functionality"; // URL for the backend API
          const requestData = {
            name:name,
            description: description,
            process: process,
          };
      
          // Make a POST request to your backend API
          const response = await axios.post(url, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Show success Snackbar
          handleClick();
          setTimeout(() => navigate('/datasets/functionalities'), 2000); // Redirect after 2 seconds
        } catch (error) {
          console.error("Error fetching functionalities:", error);
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
    Functionality created successfully!
  </Alert>
</Snackbar>
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Add New Functionality</h3></center>
        <form onSubmit={addFunctionality}>
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Name" required variant="outlined" fullWidth value={name} onChange={handleChangeName}/>
      </Grid>

      <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id="process-select-label">Related Process</InputLabel>
                <Select
                  labelId="process-select-label"
                  id="process-select"
                  value={process}
                  label="Related Process"
                  onChange={handleChangeProcess}
                >
                  {processes.map((processItem) => (
                    <MenuItem key={processItem._id} value={processItem._id}>
                      {processItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
 
      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created functionality..."
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
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/functionalities')} startIcon={<CancelIcon/>}>
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
