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
    const [statusReason, setStatusReason] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [inflight, setInflight] = React.useState('false');
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

    const handleChangeIdentifier = (event) => {
        setIdentifier(event.target.value);
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    };
    const handleChangeStatusReason = (event) => {
        setStatusReason(event.target.value);
      };
    const handleBrand = (event) => {
        setBrand(event.target.value)
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleInflightChange = (event) => {        
        setInflight(event.target.value);
    }

    const fetchAssetCount = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${backLink}/assets/count-assets` ,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.count;
        } catch (error) {
            console.error("Error fetching asset count:", error);
            return 0; // Default to 0 if there's an error
        }
    };

    const generateTypeField = async () => {
        try {
          const assetCount = await fetchAssetCount(); // Fetch the count of assets
          const newType = `type${(assetCount + 1).toString().padStart(2, '0')}`; // Generate the new type value with leading zero if needed
          return newType;
        } catch (error) {
          console.error("Error generating type field:", error);
          return null; // Return null or handle errors as needed
        }
      };
      
    

    const addAsset = async () => {
        const token = localStorage.getItem('token');
        const type = await generateTypeField();
        console.log("this is the type value " + type);
        try {
          const url = backLink+"/assets/add-asset"; // URL for the backend API
          const requestData = {
            type: type,
            identifier: identifier,
            status: status,
            status_reason: statusReason,
            brand: brand,
            inflight: inflight,
            description: description,
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
          setTimeout(() => navigate('/datasets/assets'), 2000); // Redirect after 2 seconds
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
    Asset created successfully!
  </Alert>
</Snackbar>
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Add New Asset</h3></center>
        {/* <form onSubmit={addAsset}> */}
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

      <Grid size={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status Reason</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusReason}
          label="Status Reason"
          onChange={handleChangeStatusReason}
        >
          <MenuItem value="Staus Reason 1">Staus Reason 1</MenuItem>
          <MenuItem value="Staus Reason 2">Status Reason 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>



      <Grid size={2}>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Inflight ?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="false"
        value={inflight}
        onChange={handleInflightChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
        <FormControlLabel value="false" control={<Radio />} label="No"/>
      </RadioGroup>
    </FormControl>
</Grid>


      <Grid size={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brand}
          label="Brand"
          onChange={handleBrand}
        >
          <MenuItem value="Brand 1">Brand 1</MenuItem>
          <MenuItem value="Brand 2">Brand 2</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created asset..."
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
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/assets')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={addAsset} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    {/* </form> */}
    </Paper>
    </>
  );
}
