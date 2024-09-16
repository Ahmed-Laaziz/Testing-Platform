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
    const [reference, setReference] = React.useState('');
    const [release, setRelease] = React.useState('');
    const [functionality, setfunctionality] = React.useState(''); // For selected functionality ID
    const [functionalities, setfunctionalities] = React.useState([]); // For fetched functionalities
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

    const handleChangefunctionality = (event) => {
        setfunctionality(event.target.value); // Store selected functionality ID
      };
    
      const handleChangeReference = (event) => {
        setReference(event.target.value);
    }
    const handleChangeRelease = (event) => {
      setRelease(event.target.value);
  }

    // Fetch functionalities when the component mounts
  React.useEffect(() => {
    const fetchfunctionalities = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(backLink + "/functionalities/all-functionalities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setfunctionalities(response.data); // Assuming the response is an array of functionalities
      } catch (error) {
        console.error("Error fetching functionalities:", error);
      }
    };

    fetchfunctionalities();
  }, []);

    
    

    const addSubFunctionality = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const token = localStorage.getItem('token');
        try {
          const url = backLink+"/subFunctionalities/add-subFunctionality"; // URL for the backend API
          const requestData = {
            name:name,
            description: description,
            functionality: functionality,
            reference: reference,
            release:release
          };
      
          // Make a POST request to your backend API
          const response = await axios.post(url, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Show success Snackbar
          handleClick();
          setTimeout(() => navigate('/datasets/subFunctionalities'), 2000); // Redirect after 2 seconds
        } catch (error) {
          console.error("Error fetching subFunctionalities:", error);
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
    SubFunctionality created successfully!
  </Alert>
</Snackbar>
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Add New SubFunctionality</h3></center>
        <form onSubmit={addSubFunctionality}>
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Name" required variant="outlined" fullWidth value={name} onChange={handleChangeName}/>
      </Grid>

      <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel id="functionality-select-label">Related functionality</InputLabel>
                <Select
                  labelId="functionality-select-label"
                  id="functionality-select"
                  value={functionality}
                  label="Related functionality"
                  onChange={handleChangefunctionality}
                >
                  {functionalities.map((functionalityItem) => (
                    <MenuItem key={functionalityItem._id} value={functionalityItem._id}>
                      {functionalityItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

           

      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Reference</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={reference}
          label="Reference"
          onChange={handleChangeReference}
        >
          <MenuItem value="Refernce 1">Refernce 1</MenuItem>
          <MenuItem value="Refernce 2">Refernce 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Release</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={release}
          label="Release"
          onChange={handleChangeRelease}
        >
          <MenuItem value="Release 1">Release 1</MenuItem>
          <MenuItem value="Release 2">Release 2</MenuItem>
        </Select>
      </FormControl>
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
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/subFunctionalities')} startIcon={<CancelIcon/>}>
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
