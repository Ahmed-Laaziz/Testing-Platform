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

export default function EditConsumerPage () {
  const backLink = "http://localhost:5000";
    const location = useLocation();
    const { consumerId } = location.state || {}; // Access consumerId from state
    const [consumer, setConsumer] = React.useState(null);
    const navigate = useNavigate(); 
    const [nic, setNic] = React.useState('')
    const [status, setStatus] = React.useState('');
    const [statusReason, setStatusReason] = React.useState('');
    const [brand, setBrand] = React.useState('');
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

    const handleChangeNic = (event) => {
        setNic(event.target.value);
        consumer.nic = event.target.value;
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      consumer.status = event.target.value;
    };
    const handleChangeStatusReason = (event) => {
        setStatusReason(event.target.value);
        consumer.status_reason = event.target.value;
      };
    const handleBrand = (event) => {
        setBrand(event.target.value)
        consumer.brand = event.target.value;
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
        consumer.description = event.target.value;
    }

    console.log("Consumer ID:", consumerId);


    React.useEffect(() => {
        const fetchConsumer = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you use token-based auth
                const response = await axios.get(`${backLink}/consumers/consumer/${consumerId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setConsumer(response.data); // Store consumer data 
                
            } catch (err) {
                console.error('Error fetching consumer:', err);
                
            }
        };

        fetchConsumer();
    }, [consumerId]);


    const editConsumer = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const token = localStorage.getItem('token');
          await axios.put(`${backLink}/consumers/consumer/${consumerId}`, consumer, {
            headers: { Authorization: `Bearer ${token}` },
          });
           // Show success Snackbar
            handleClick();
          setTimeout(() => navigate('/datasets/consumers'), 2000); // Redirect after 2 seconds
        } catch (err) {
          console.error('Error updating consumer:', err);
        }
      };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Consumer updated successfully!
      </Alert>
    </Snackbar>
        
        <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Edit Consumer</h3></center>
        {consumer && (
        
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Nic" required variant="outlined" fullWidth value={nic || consumer?.nic || ''} onChange={handleChangeNic}/>
      </Grid>
      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status || consumer?.status || ''}
          label="Status"
          onChange={handleChangeStatus}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Total Suspension">Total Suspension</MenuItem>
          <MenuItem value="Partial Suspension">Partial Suspension</MenuItem>
          <MenuItem value="Terminate">Terminate</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status Reason</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusReason || consumer?.status_reason || ''}
          label="Status Reason"
          onChange={handleChangeStatusReason}
        >
          <MenuItem value="Standard">Standard</MenuItem>
          <MenuItem value="Portability">Portability</MenuItem>
          <MenuItem value="Block">Block</MenuItem>
          <MenuItem value="Reactivation">Reactivation</MenuItem>
          <MenuItem value="Unblock">Unblock</MenuItem>
          <MenuItem value="Change Ownership">Change Ownership</MenuItem>
          <MenuItem value="Credit Control Request">Credit Control Request</MenuItem>
          <MenuItem value="Change Billing Account">Change Billing Account</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Paused">Paused</MenuItem>
          <MenuItem value="Standby">Standby</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
          <MenuItem value="Off">Off</MenuItem>
          <MenuItem value="Not Ready">Not Ready</MenuItem>
          <MenuItem value="Suspension by Customer Request">Suspension by Customer Request</MenuItem>
          <MenuItem value="Fraud">Fraud</MenuItem>
          <MenuItem value="Customer request">Customer request</MenuItem>
          <MenuItem value="Dunning">Dunning</MenuItem>
          <MenuItem value="Ausency/incapacity proven">Ausency/incapacity proven</MenuItem>
          <MenuItem value="Customer Does Not Inform Reason">Customer Does Not Inform Reason</MenuItem>
          <MenuItem value="Death">Death</MenuItem>
          <MenuItem value="PPP Transfer - MIMO TPCR">PPP Transfer - MIMO TPCR</MenuItem>
          <MenuItem value="Loss/Stolen">Loss/Stolen</MenuItem>
          <MenuItem value="Proven Unemployment">Proven Unemployment</MenuItem>
          <MenuItem value="Resolution by Contractual Alteration">Resolution by Contractual Alteration</MenuItem>
          <MenuItem value="Free resolution Right">Free resolution Right</MenuItem>
          <MenuItem value="No coverage">No coverage</MenuItem>
          <MenuItem value="Social Internet Tariff - Eligibility loss">Social Internet Tariff - Eligibility loss</MenuItem>
          <MenuItem value="Bankruptcy">Bankruptcy</MenuItem>
          <MenuItem value="Corporate Client Manager's Request">Corporate Client Manager's Request</MenuItem>
          <MenuItem value="Crushed/Smashed SIM Portability">Crushed/Smashed SIM Portability</MenuItem>
          <MenuItem value="Insolvency/Dissolution/Liquidation">Insolvency/Dissolution/Liquidation</MenuItem>
          <MenuItem value="Superior Approval">Superior Approval</MenuItem>
          <MenuItem value="Transfer to other Product/Service MEO Mobile">Transfer to other Product/Service MEO Mobile</MenuItem>
        </Select>
      </FormControl>
      </Grid>





      <Grid size={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brand || consumer?.brand || ''}
          label="Brand"
          onChange={handleBrand}
        >
           <MenuItem value="UZO">UZO</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created consumer..."
            multiline
            rows={5}
            value={description || consumer?.description || ''}
            onChange={handleChangeDescription}
            required
            />
            </Grid>
    
    <Grid size={8}>
        <></>
    </Grid>

    <Grid size={2}>
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/consumers')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={editConsumer} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    
        )}
    </Paper>
    </>
    );
};
