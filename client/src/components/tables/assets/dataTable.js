import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Typography} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

dayjs.extend(relativeTime);

const backLink = "http://localhost:5000";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DataTable() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleUpdateClick = (asset) => {
    navigate('/edit-asset', { state: { assetId: asset._id } }); // Pass asset ID via state
};


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

  // Custom Toolbar component
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        {/* Button to open modal */}
        <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={() => navigate('/add-asset')} >
          Add Asset
        </Button>
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        />
      </GridToolbarContainer>
    );
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const columns = [
    { field: 'type', headerName: 'Type', width: 70 },
    { field: 'identifier', headerName: 'Identifier', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'status_reason', headerName: 'Status Reason', width: 130 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'inflight', headerName: 'Inflight', type: 'boolean', width: 70 },
    { field: 'description', headerName: 'Description', width: 530 },
    { field: 'isUptoDate', headerName: 'is Up to Date ?', width: 130,
      valueFormatter: (params) => {
        if (params) return 'Yes'
        else if (!params) return 'No'
      }
    },
    {
    field: 'updatedAt',
    headerName: 'Last Modified',
    width: 180,
    //valueGetter: (params) => params.row?.updatedAt ?? null,
    valueFormatter: (params) => {
      if (!params) return '';
      return dayjs(params).fromNow(); // => "3 hours ago"
    }
  }
,
    {
  field: 'actions',
  headerName: 'Actions',
  width: 180,
  renderCell: (params) => {
    const row = params.row;

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(row.soqlQuery || '');
        setOpen(true);
      } catch (err) {
        console.error("Copy failed", err);
      }
    };

    return (
      <Stack spacing={0} direction="row">
        <Button
          variant='text'
          size="small"
          startIcon={<EditIcon />}
          onClick={() => handleUpdateClick(row)}
        />
        <Button
          variant="text"
          size="small"
          onClick={handleCopy}
          startIcon = {<ContentCopyIcon />}
        />
          
      </Stack>
    );
  },
}

  ];

  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: isSmallScreen ? column.width : column.width,
    flex: 2,
  }));

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const token = localStorage.getItem('token');
        const userEnv = localStorage.getItem('userEnv'); // Retrieve userEnv
  
        if (!userEnv) {
          console.warn("User environment (userEnv) is not set.");
          return;
        }
  
        // Define the branch based on userEnv
        let branch;
        if (userEnv === "DEV") {
          branch = "New_DevCI_Draft"; // Replace with the actual DEV branch name
        }
        else if (userEnv === "UAT") {
          branch = "UAT_branch";
        }
        else {
          branch = "Draft_tests_branch"; // Use userEnv as branch name for other environments
        }
  
        console.log("Fetching assets for branch:", branch);
  
        const response = await axios.get(`${backLink}/assets/assetsByBranch/${branch}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    
    <Box sx={{ padding: '20px' }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
    <>
    <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
            Text copied successfully!
          </Alert>
        </Snackbar>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={responsiveColumns}
          slots={{
            toolbar: CustomToolbar,
          }}
          loading={loading}
          pageSize={isSmallScreen ? 5 : 7}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.type}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
     )}
            </Box>
  );
}
