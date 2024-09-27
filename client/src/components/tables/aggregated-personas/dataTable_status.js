import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';  // Import ExcelJS
import { saveAs } from 'file-saver';
// API base URL
const API_BASE_URL = 'http://localhost:5000';

const PermissionTableWithStatus = () => {
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
          headers: { Authorization: `Bearer ${token}` },
        });
        const functionalitiesResponse = await axios.get(`${API_BASE_URL}/functionalities/all-functionalities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subFunctionalitiesResponse = await axios.get(`${API_BASE_URL}/subfunctionalities/all-subfunctionalities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const personasResponse = await axios.get(`${API_BASE_URL}/personas/all-personas`, {
          headers: { Authorization: `Bearer ${token}` },
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

  // Custom Toolbar component with Export button for Excel
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={handleExportExcel}>
          Export as Excel
        </Button>
        <GridToolbarExport slotProps={{ tooltip: { title: 'Export data' }, button: { variant: 'outlined' } }} />
      </GridToolbarContainer>
    );
  }

  // Prepare columns for DataGrid (dynamically include personas' status)
  const columns = [
    { field: 'functionality', headerName: 'Functionality', width: 200 },
    { field: 'subFunctionality', headerName: 'Sub-Functionality', width: 200 },
    // Add persona columns with Status values dynamically
    ...personas.map((persona) => ({
      field: persona._id, // Persona column name
      headerName: persona.name,
      width: 150,
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

    if (relatedSubFunctionalities.length === 0) {
      return [
        {
          id: functionality._id,
          functionality: functionality.name,
          subFunctionality: 'No Sub-Functionalities',
          ...personas.reduce((acc, persona) => ({ ...acc, [persona._id]: 'N/A' }), {}),
        },
      ];
    }

    return relatedSubFunctionalities.map((subFunctionality) => {
      const personaStatus = personas.reduce((acc, persona) => {
        // Find the status for the persona on the current sub-functionality
        const permission = (subFunctionality.permissions || []).find((perm) => perm.persona === persona._id);
        acc[persona._id] = permission ? permission.status || 'No Status' : 'No Status'; // If no status is set, show "No Status"
        return acc;
      }, {});

      return {
        id: subFunctionality._id,
        functionality: functionality.name,
        subFunctionality: subFunctionality.name,
        ...personaStatus,
      };
    });
  });

  // Handle Export to Excel functionality
  // Handle Export to Excel with conditional formatting
   // Export to Excel with colors for OK/KO
   const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Permissions Status');

    // Define header row
    worksheet.addRow(columns.map((col) => col.headerName));

    // Define data rows
    rows.forEach((row) => {
      const rowData = columns.map((col) => row[col.field] || '');
      const newRow = worksheet.addRow(rowData);

      // Apply conditional formatting
      columns.forEach((col, colIndex) => {
        const cell = newRow.getCell(colIndex + 1); // Excel cells are 1-indexed
        if (row[col.field] === 'OK') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00FF00' }, // Green for Yes
          };
        } else if (row[col.field] === 'KO') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0000' }, // Red for No
          };
        }
      });
    });

    // Export file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'permissions_status.xlsx');
  };


  return (
    <Box>
      <div style={{ height: '100vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
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

export default PermissionTableWithStatus;
