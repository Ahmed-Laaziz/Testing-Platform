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
    const [tariff, setTariff] = React.useState('');
    const [loyalty, setLoyalty] = React.useState('');
    const [addons, setAddons] = React.useState('');
    const [invoice, setInvoice] = React.useState('');
    const [payment, setPayment] = React.useState('');
    const [location, setLocation] = React.useState('');
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
    const handleChangeTariff = (event) => {
      setTariff(event.target.value);
    };
    const handleChangeLoyalty = (event) => {
        setLoyalty(event.target.value);
      };
    const handleChangeAddons = (event) => {
        setAddons(event.target.value)
    }
    const handleChangeInvoice = (event) => {
        setInvoice(event.target.value);
    }
    const handleChangePayment = (event) => {        
        setPayment(event.target.value);
    }
    const handleChangeLocation = (event) => {        
        setLocation(event.target.value);
    }

    const fetchAccountCount = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${backLink}/accounts/count-accounts` ,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data.count;
        } catch (error) {
            console.error("Error fetching account count:", error);
            return 0; // Default to 0 if there's an error
        }
    };
    

    const addAccount = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
        const token = localStorage.getItem('token');
        try {
          const url = backLink+"/accounts/add-account"; // URL for the backend API
          const requestData = {
            name: name,
            tariff: tariff,
            loyalty: loyalty,
            addons: addons,
            invoice: invoice,
            payment: payment,
            location: location
          };
      
          // Make a POST request to your backend API
          const response = await axios.post(url, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Show success Snackbar
          handleClick();
          setTimeout(() => navigate('/datasets/accounts'), 2000); // Redirect after 2 seconds
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
    Account created successfully!
  </Alert>
</Snackbar>
    <Paper elevation={3} >
        <>&nbsp;</>
        <center><h3>&nbsp;Add New Account</h3></center>
        <form onSubmit={addAccount}>
        <Grid container spacing={2} sx={{padding:"2%"}}>
        <Grid size={4}>
      <TextField id="outlined-basic" label="Name" required variant="outlined" fullWidth value={name} onChange={handleChangeName}/>
      </Grid>
      <Grid size={4}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tariff</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tariff}
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
          value={loyalty}
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
          value={addons}
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
          value={invoice}
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
          value={payment}
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
          value={location}
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
