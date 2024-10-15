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

export default function EditAccountPage () {
  const backLink = "http://localhost:5000";
    const user_location = useLocation();
    const { accountId } = user_location.state || {}; // Access accountId from state
    const [account, setAccount] = React.useState(null);
    const navigate = useNavigate(); 
    const [name, setName] = React.useState('')
    const [tariff, setTariff] = React.useState('');
    const [loyalty, setLoyalty] = React.useState('');
    const [addons, setAddons] = React.useState('');
    const [invoice, setInvoice] = React.useState('');
    const [payment, setPayment] = React.useState('');
    const [location, setLocation] = React.useState('');
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

    const handleChangeName = (event) => {
        setName(event.target.value);
        account.name = event.target.value;
    }
    const handleChangeTariff = (event) => {
      setTariff(event.target.value);
      account.tariff = event.target.value;
    };
    const handleChangeLoyalty = (event) => {
        setLoyalty(event.target.value);
        account.loyalty = event.target.value;
      };
    const handleChangeAddons = (event) => {
        setAddons(event.target.value);
        account.addons = event.target.value;
    }
    const handleChangeInvoice = (event) => {
        setInvoice(event.target.value);
        account.invoice = event.target.value;
    }
    const handleChangePayment = (event) => {        
        setPayment(event.target.value);
        account.payment = event.target.value;
    }
    const handleChangeLocation = (event) => {        
        setLocation(event.target.value);
        account.location = event.target.value;
    }

    console.log("Account ID:", accountId);


    React.useEffect(() => {
        const fetchAccount = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you use token-based auth
                const response = await axios.get(`${backLink}/accounts/account/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAccount(response.data); // Store account data 
                
            } catch (err) {
                console.error('Error fetching account:', err);
                
            }
        };

        fetchAccount();
    }, [accountId]);

    const editAccount = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const token = localStorage.getItem('token');
          await axios.put(`${backLink}/accounts/account/${accountId}`, account, {
            headers: { Authorization: `Bearer ${token}` },
          });
           // Show success Snackbar
            handleClick();
          setTimeout(() => navigate('/datasets/accounts'), 2000); // Redirect after 2 seconds
        } catch (err) {
          console.error('Error updating account:', err);
        }
      };

    return (
        <>
        {/* Snackbar for success message */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
        Account updated successfully!
      </Alert>
    </Snackbar>
        
        <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Edit Account</h3></center>
        {account && (
        
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={4}>
      <TextField id="outlined-basic" label="Name" required variant="outlined" fullWidth value={name || account?.name || ''} onChange={handleChangeName}/>
      </Grid>




      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tariff</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tariff || account?.tariff || ''}
          label="Tariff"
          onChange={handleChangeTariff}
        >
          <MenuItem value="UZO 500+500MB">UZO 500+500MB</MenuItem>
          <MenuItem value="UZO 2000+1GB">UZO 2000+1GB</MenuItem>
          <MenuItem value="UZO 2000+3GB">UZO 2000+3GB</MenuItem>
          <MenuItem value="UZO 2000+6GB">UZO 2000+6GB</MenuItem>
          <MenuItem value="UZO 2000+15GB">UZO 2000+15GB</MenuItem>
          <MenuItem value="UZO 2000+4GB">UZO 2000+4GB</MenuItem>
          <MenuItem value="ZO 2500+20GB">UZO 2500+20GB</MenuItem>
          <MenuItem value="UZO 500+500+500">UZO 500+500+500</MenuItem>
          <MenuItem value="UZO ILIM+10GB">UZO ILIM+10GB</MenuItem>
        </Select>
      </FormControl>
      </Grid>


      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Loyalty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={loyalty || account?.loyalty || ''}
          label="Loyalty"
          onChange={handleChangeLoyalty}
        >
          <MenuItem value="Com">Com</MenuItem>
          <MenuItem value="Sem">Sem</MenuItem>
        </Select>
      </FormControl>
      </Grid>


      <Grid size={3}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Addons</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={addons || account?.addons || ''}
          label="addons"
          onChange={handleChangeAddons}
        >
          <MenuItem value="Plano UZO+">Plano UZO+</MenuItem>
          <MenuItem value="Net Extra 500MB">Net Extra 500MB</MenuItem>
          <MenuItem value="Net Extra 1GB">Net Extra 1GB</MenuItem>
          <MenuItem value="Net Extra 2GB">Net Extra 2GB</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={3}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Invoice</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={invoice || account?.invoice || ''}
          label="Invoice"
          onChange={handleChangeInvoice}
        >
          <MenuItem value="Paper">Paper</MenuItem>
          <MenuItem value="Electronic">Electronic</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={3}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={payment || account?.payment || ''}
          label="Payment"
          onChange={handleChangePayment}
        >
          <MenuItem value="ATM">ATM</MenuItem>
          <MenuItem value="Direct debit">Direct debit</MenuItem>
        </Select>
      </FormControl>
      </Grid>


      <Grid size={3}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location || account?.location || ''}
          label="Location"
          onChange={handleChangeLocation}
        >
          <MenuItem value="Continente">Continente</MenuItem>
          <MenuItem value="Açores">Açores</MenuItem>
          <MenuItem value="Madeira">Madeira</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid size={8}>
        <></>
    </Grid>

    <Grid size={2}>
    <Button variant="outlined" fullWidth onClick={() => navigate('/datasets/accounts')} startIcon={<CancelIcon/>}>
  Cancel
</Button>
    </Grid>
    <Grid size={2}>
    <Button variant="contained" fullWidth type='submit' onClick={editAccount} startIcon={<SaveIcon/>}>
  Save
</Button>
    </Grid>
    
    </Grid>
    
        )}
    </Paper>
    </>
    );
};
