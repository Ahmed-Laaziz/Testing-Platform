import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
// API base URL
const API_BASE_URL = 'http://localhost:5000';

const PermissionTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  
  const [processes, setProcesses] = useState([]);
  const [functionalities, setFunctionalities] = useState([]);
  const [subFunctionalities, setSubFunctionalities] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data for processes, functionalities, sub-functionalities, and personas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const processesResponse = await axios.get(`${API_BASE_URL}/processes/all-processes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const functionalitiesResponse = await axios.get(`${API_BASE_URL}/functionalities/all-functionalities`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const subFunctionalitiesResponse = await axios.get(`${API_BASE_URL}/subfunctionalities/all-subfunctionalities`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const personasResponse = await axios.get(`${API_BASE_URL}/personas/all-personas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setProcesses(processesResponse.data);
        setFunctionalities(functionalitiesResponse.data);
        setSubFunctionalities(subFunctionalitiesResponse.data);
        setPersonas(personasResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

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
        {/* <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={() => navigate('/add-persona')} >
          Add Persona
        </Button> */}
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        />
      </GridToolbarContainer>
    );
  }

  

  // Prepare columns for DataGrid (dynamically include personas' permissions)
  const columns = [
    { field: 'functionality', headerName: 'Functionality', width: 200 },
    { field: 'subFunctionality', headerName: 'Sub-Functionality', width: 200 },
    // Add persona columns with Yes/No permissions dynamically
    ...personas.map((persona) => ({
      field: persona._id, // Persona column name
      headerName: persona.name,
      width: 150,
    //   renderCell: (params) => (params.value ? 'Yes' : 'No'), // Render Yes/No for permission
    })),
  ];

  const responsiveColumns = columns.map((column) => ({
    ...column,
    width: isSmallScreen ? 'auto' : 150,
    flex: 1,
  }));

  // Prepare rows for DataGrid
  const rows = functionalities.flatMap((functionality) => {
    // Get all sub-functionalities for the functionality
    const relatedSubFunctionalities = subFunctionalities.filter(
      (subFunc) => subFunc.functionality === functionality._id
    );

     // Handle no sub-functionalities (permissions set to 'N/A')
     if (relatedSubFunctionalities.length === 0) {
        return [
          {
            id: functionality._id, // Unique row ID
            functionality: functionality.name,
            subFunctionality: 'No Sub-Functionalities',
            // Set permissions to 'N/A'
            ...personas.reduce((acc, persona) => ({ ...acc, [persona._id]: 'N/A' }), {}),
          },
        ];
      }

    // Handle sub-functionalities with or without permissions
    return relatedSubFunctionalities.map((subFunctionality) => {
        const personaPermissions = personas.reduce((acc, persona) => {
          // Find the permission for the persona on the current sub-functionality
          const permission = (subFunctionality.permissions || []).find(
            (perm) => perm.persona === persona._id
          );
          acc[persona._id] = permission
            ? permission.hasPermission
              ? 'Yes'
              : 'No'
            : 'No Permission Set'; // If no permission is set, show "No Permission Set"
          return acc;
        }, {});

      return {
        id: subFunctionality._id, // Unique row ID
        functionality: functionality.name,
        subFunctionality: subFunctionality.name,
        ...personaPermissions, // Spread permissions dynamically into the row
      };
    });
  });

  return (
    <Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
        rows={rows} 
        columns={responsiveColumns}
        slots={{
          toolbar: CustomToolbar,
        }}
        loading={loading}
        pageSize={isSmallScreen ? 5 : 7}
        rowsPerPageOptions={[5, 10]}
        getRowId={(row) => row.subFunctionality + row.functionality}
        sx={{ border: 0 }}
         />
      </div>
    </Box>
  );
};

export default PermissionTable;