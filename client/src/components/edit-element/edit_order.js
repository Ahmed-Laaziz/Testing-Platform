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

export default function EditOrderPage () {
  const backLink = "http://localhost:5000";
    const location = useLocation();
    const { orderId } = location.state || {}; // Access orderId from state
    const [order, setOrder] = React.useState(null);
    const navigate = useNavigate(); 
    const [identifier, setIdentifier] = React.useState('')
    const [status, setStatus] = React.useState('');
    const [owner, setOwner] = React.useState('');
    const [statusReason, setStatusReason] = React.useState('');
    const [fulfillmentStatus, setFulfillmentStatus] = React.useState('');
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
        order.identifier = event.target.value;
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      order.status = event.target.value;
    };
    const handleChangeStatusReason = (event) => {
        setStatusReason(event.target.value);
        order.status_reason = event.target.value;
      };
      const handleChangeFulfillmentStatus = (event) => {
        setFulfillmentStatus(event.target.value);
        order.fulfillmentStatus = event.target.fulfillmentStatus;
      };

      const handleOwner = (event) => {
        setOwner(event.target.value)
        order.owner=event.target.owner
    }
    
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
        order.description = event.target.value;
    }
    

    console.log("Order ID:", orderId);


    React.useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you use token-based auth
                const response = await axios.get(`${backLink}/orders/order/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrder(response.data); // Store order data 
                
            } catch (err) {
                console.error('Error fetching order:', err);
                
            }
        };

        fetchOrder();
    }, [orderId]);


    const editOrder = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const token = localStorage.getItem('token');
          await axios.put(`${backLink}/orders/order/${orderId}`, order, {
            headers: { Authorization: `Bearer ${token}` },
          });
           // Show success Snackbar
            handleClick();
          setTimeout(() => navigate('/datasets/orders'), 2000); // Redirect after 2 seconds
        } catch (err) {
          console.error('Error updating order:', err);
        }
      };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Order updated successfully!
      </Alert>
    </Snackbar>
        
        <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Edit Order</h3></center>
        {order && (
        
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Identifier" required variant="outlined" fullWidth value={identifier || order?.identifier || ''} onChange={handleChangeIdentifier}/>
      </Grid>
      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Owner</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={owner || order?.owner || ''}
          label="Owner"
          onChange={handleOwner}
        >
          <MenuItem value="FO">FO</MenuItem>
          <MenuItem value="BO">BO</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid size={12}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created order..."
            multiline
            rows={5}
            value={description || order?.description || ''}
            onChange={handleChangeDescription}
            required
            />
            </Grid>
      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status || order?.status || ''}
          label="Status"
          onChange={handleChangeStatus}
        >
          <MenuItem value="Activated">Activated</MenuItem>
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Submission Actions">Submission Actions</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status Reason</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusReason || order?.status_reason || ''}
          label="Status Reason"
          onChange={handleChangeStatusReason}
        >
          <MenuItem value="PUK blocked">PUK blocked</MenuItem>
          <MenuItem value="Damage SIM">Damage SIM</MenuItem>
          <MenuItem value="Doesn't fit">Doesn't fit</MenuItem>
          <MenuItem value="Faulty">Faulty</MenuItem>
          <MenuItem value="Lost & Stolen">Lost & Stolen</MenuItem>
          <MenuItem value="Malicious calls">Malicious calls</MenuItem>
          <MenuItem value="Nuisance calls">Nuisance calls</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
          <MenuItem value="Absence for foreign country">Absence for foreign country</MenuItem>
          <MenuItem value="Loss of installation location">Loss of installation location</MenuItem>
          <MenuItem value="Customer Requested Suspension">Customer Requested Suspension</MenuItem>
          <MenuItem value="Medical absence">Medical absence</MenuItem>
          <MenuItem value="Absence due to disability/prolonged illness">Absence due to disability/prolonged illness</MenuItem>
          <MenuItem value="Absence for prison sentence">Absence for prison sentence</MenuItem>
          <MenuItem value="Suspension due to Fraud">Suspension due to Fraud</MenuItem>
          <MenuItem value="Unemployment">Unemployment</MenuItem>
          <MenuItem value="Ausency/Incapacity Proven">Ausency/Incapacity Proven</MenuItem>
          <MenuItem value="Bankruptcy">Bankruptcy</MenuItem>
          <MenuItem value="Corporate Client Manager,s Request">Corporate Client Manager,s Request</MenuItem>
          <MenuItem value="Crushed/Smashed SIM Portability">Crushed/Smashed SIM Portability</MenuItem>
          <MenuItem value="Customer Does Not Inform Reason">Customer Does Not Inform Reason</MenuItem>
          <MenuItem value="Death">Death</MenuItem>
          <MenuItem value="Fraud">Fraud</MenuItem>
          <MenuItem value="Credit Control Request">Credit Control Request</MenuItem>
          <MenuItem value="Change Ownership">Change Ownership</MenuItem>
          <MenuItem value="Free resolution right">Free resolution right</MenuItem>
          <MenuItem value="Insolvency/Dissolution/Liquidation">Insolvency/Dissolution/Liquidation</MenuItem>
          <MenuItem value="Loss/Stolen">Loss/Stolen</MenuItem>
          <MenuItem value="No coverage">No coverage</MenuItem>
          <MenuItem value="Non-payment">Non-payment</MenuItem>
          <MenuItem value="Portability">Portability</MenuItem>
          <MenuItem value="PPP Transfer -> MIMO (TPCR) / Change to old stack">PPP Transfer - MIMO (TPCR) / Change to old stack</MenuItem>
          <MenuItem value="Resolution by Contractual Alteration">Resolution by Contractual Alteration</MenuItem>
          <MenuItem value="Social Internet Tariff - Eligibility loss">Social Internet Tariff – Eligibility loss</MenuItem>
          <MenuItem value="Superior Approval">Superior Approval</MenuItem>
          <MenuItem value="Transfer to other Product/Service MEO Mobile Network">Transfer to other Product/Service MEO Mobile Network</MenuItem>
          <MenuItem value="Proven unemployment">Proven unemployment</MenuItem>
          <MenuItem value="Customer Request">Customer Request</MenuItem>
          <MenuItem value="Consumption limit upgrade">Consumption limit upgrade</MenuItem>
          <MenuItem value="Consumption limit downgrade">Consumption limit downgrade</MenuItem>
          <MenuItem value="By customer request">By customer request</MenuItem>
          <MenuItem value="Not customer fault">Not customer fault</MenuItem>
          <MenuItem value="Loss/Theft">Loss/Theft</MenuItem>
          <MenuItem value="Incompatibility with the new cell phone">Incompatibility with the new cell phone</MenuItem>
          <MenuItem value="Network registry error due to SIM failure">Network registry error due to SIM failure</MenuItem>
          <MenuItem value="In warranty, if the card is damage">In warranty, if the card is damage</MenuItem>
          <MenuItem value="Loss of first SIM card in case of I join process (new or ported-in)">Loss of first SIM card in case of I join process (new or ported-in)</MenuItem>
          <MenuItem value="I join to e-SIM (ported-in or new)">I join to e-SIM (ported-in or new)</MenuItem>
          <MenuItem value="e-SIM replacement for post-paid customers">e-SIM replacement for post-paid customers</MenuItem>
          <MenuItem value="e-SIM technical assistance (due to limitation on profile download)">e-SIM technical assistance (due to limitation on profile download)</MenuItem>
          <MenuItem value="SIM not delivered">SIM not delivered</MenuItem>
          <MenuItem value="Commercial - Process dropped">Commercial - Process dropped</MenuItem>
          <MenuItem value="Loss">Loss</MenuItem>
          <MenuItem value="Theft">Theft</MenuItem>
          <MenuItem value="Block">Block</MenuItem>
          <MenuItem value="Unblock">Unblock</MenuItem>
          <MenuItem value="Suspend - Dunning Parcial (Manual)">Suspend - Dunning Parcial (Manual)</MenuItem>
          <MenuItem value="Suspend - Dunning Total (Manual)">Suspend - Dunning Total (Manual)</MenuItem>
          <MenuItem value="Change Billing Account">Change Billing Account</MenuItem>
          <MenuItem value="Internal Correction">Internal Correction</MenuItem>
        </Select>
      </FormControl>
      </Grid>


    
    
    <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Fulfillment Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fulfillmentStatus || order?.fulfillment_status || ''}
          label="Fulfillment Status"
          onChange={handleChangeFulfillmentStatus}
        >
          <MenuItem value="Activated">Activated</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
        </Select>
      </FormControl>
      </Grid>

    <Grid size={2}>
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/orders')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={editOrder} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    
        )}
    </Paper>
    </>
    );
};
