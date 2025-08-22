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
    const { assetId } = location.state || {}; // Access assetId from state
    const [asset, setAsset] = React.useState(null);
    const navigate = useNavigate(); 
    const [identifier, setIdentifier] = React.useState('')
    const [status, setStatus] = React.useState('');
    const [statusReason, setStatusReason] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [soql, setSoql] = React.useState('')
    const [inflight, setInflight] = React.useState('false');
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
        asset.identifier = event.target.value;
    }
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      asset.status = event.target.value;
    };
    const handleChangeStatusReason = (event) => {
        setStatusReason(event.target.value);
        asset.status_reason = event.target.value;
      };
    const handleBrand = (event) => {
        setBrand(event.target.value)
        asset.brand = event.target.value;
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
        asset.description = event.target.value;
    }
    const handleSoql = (event) => {
      setSoql(event.target.value);
      asset.soqlQuery = event.target.value;
    }
    const handleInflightChange = (event) => {        
        setInflight(event.target.value);
        asset.inflight = event.target.value;
    }

    console.log("Asset ID:", assetId);


    React.useEffect(() => {
        const fetchAsset = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you use token-based auth
                const response = await axios.get(`${backLink}/assets/asset/${assetId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAsset(response.data); // Store asset data 
                
            } catch (err) {
                console.error('Error fetching asset:', err);
                
            }
        };

        fetchAsset();
    }, [assetId]);

    React.useEffect(() => {
        if (asset) {
          setInflight(asset.inflight ? "true" : "false"); // Set inflight state based on asset value
        }
      }, [asset])

    const editAsset = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const token = localStorage.getItem('token');
          await axios.put(`${backLink}/assets/asset/${assetId}`, asset, {
            headers: { Authorization: `Bearer ${token}` },
          });
           // Show success Snackbar
            handleClick();
          setTimeout(() => navigate('/datasets/assets'), 2000); // Redirect after 2 seconds
        } catch (err) {
          console.error('Error updating asset:', err);
        }
      };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Asset updated successfully!
      </Alert>
    </Snackbar>
        
        <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Edit Asset</h3></center>
        {asset && (
        
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={6}>
      <TextField id="outlined-basic" label="Identifier" required variant="outlined" fullWidth value={identifier || asset?.identifier || ''} onChange={handleChangeIdentifier}/>
      </Grid>
      <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status || asset?.status || ''}
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
          value={statusReason || asset?.status_reason || ''}
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
          <MenuItem value="Transfer to prepaid - old stack">Transfer to prepaid - old stack</MenuItem>
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
          value={brand || asset?.brand || ''}
          label="Brand"
          onChange={handleBrand}
        >
           <MenuItem value="UZO">UZO</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid size={6}>
      <TextField
      fullWidth
            placeholder="Write a brief description about the created asset..."
            multiline
            rows={5}
            value={description || asset?.description || ''}
            onChange={handleChangeDescription}
            required
            />
            </Grid>

             <Grid size={6}>
      <TextField
      fullWidth
            placeholder="Write the SOQL Query For data creation..."
            multiline
            rows={5}
            value={description || asset?.soqlQuery || ''}
            onChange={handleSoql}
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
    <Button variant="contained" fullWidth type='submit' onClick={editAsset} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    
        )}
    </Paper>
    </>
    );
};
