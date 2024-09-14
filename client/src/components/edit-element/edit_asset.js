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
            value={description || asset?.description || ''}
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
